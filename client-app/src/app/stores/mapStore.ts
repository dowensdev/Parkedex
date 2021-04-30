import { makeAutoObservable } from "mobx";
import { RefObject } from "react";
import { Park } from "../models/park";

type GoogleLatLng = google.maps.LatLng;

export default class MapStore {
    mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&v=quarterly`
    mapScriptLoaded: boolean = false;
    mapOptions: Object = {};

    constructor() {
        makeAutoObservable(this);
    }

    loadMapApi = () => {
        const scripts = document.getElementsByTagName('script');
        //look through returned scripts for mapsURL
        for(let i = 0; i < scripts.length; i++) {
            if(scripts[i].src.indexOf(this.mapsURL) === 0) {
                return scripts[i];
    
            }
        }
    
        //If not found on page already, create script and add it to page
        const googleMapScript = document.createElement('script');
        googleMapScript.src = this.mapsURL;
        googleMapScript.async = true;
        googleMapScript.defer = true;
        window.document.body.appendChild(googleMapScript);
        
        this.mapScriptLoaded = true;
        return googleMapScript;
    }

    initMap = (ref: RefObject<HTMLDivElement>) => {
        if(ref.current) {
            new google.maps.Map(ref.current, this.mapOptions)
        }
    }

    setMapOptions = (zoomLevel: number, coordinates: GoogleLatLng) => {
        this.mapOptions = {
            zoom: zoomLevel,
            center: coordinates,
            mapTypeControl: true,
            scaleControl: true,
            fullscreenControl: true,
            zoomControl: true,
            gestureHandling: 'cooperative',
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggableCursor: 'pointer',
        }
    }

    setCoordinates(park: Park): google.maps.LatLng {
        const lat = +park.latLong.split(",")[0].split(":")[1]
        const lng = +park.latLong.split(",")[1].split(":")[1]
        return new google.maps.LatLng(lat, lng)
    }
}