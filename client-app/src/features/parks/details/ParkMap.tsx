import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react'
import { Header } from 'semantic-ui-react'
import { Park } from '../../../app/models/park';

interface Props {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
    park: Park;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

//Maybe make observable?
export default observer(function ParkMap({mapType, mapTypeControl = false, park}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: false,
                    rotateControl: false,
                    scaleControl: true,
                    fullscreenControl: false,
                    panControl: false,
                    zoomControl: true,
                    gestureHandling: 'cooperative',
                    mapTypeId: mapType,
                    draggableCursor: 'pointer',
                })
            );
            }
    };

    useEffect(() => {
        if(!map) {
            const lat = +park.latLong.split(",")[0].split(":")[1]
            const lng = +park.latLong.split(",")[1].split(":")[1]
            const coordinates = new google.maps.LatLng(lat, lng);
            initMap(11, coordinates);
            setMap(undefined);
        }
    }, [initMap, map]);

    

    return (
            <div className="map-container" ref={ref}></div>
    )
});