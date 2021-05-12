import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react'
import { Park } from '../../../app/models/park';
import { useStore } from '../../../app/stores/store';

interface Props {
    park: Park;
}

export default observer(function ParkMap({park}: Props) {
    const {mapStore} = useStore();
    const {initMap, setMapOptions, setCoordinates} = mapStore;
    const ref = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        setMapOptions(11, setCoordinates(park));
        initMap(ref);

    }, [initMap, setMapOptions, setCoordinates, park]);

    return (
            <div className="map-container" ref={ref}></div>
    )
});