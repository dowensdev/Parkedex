export const loadMapApi = () => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&v=quarterly`;
    //capture all scripts on page
    const scripts = document.getElementsByTagName('script');
    //look through returned scripts for mapsURL
    for(let i = 0; i < scripts.length; i++) {
        if(scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];

        }
    }

    //If not found on page already, create script and add it to page
    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
}