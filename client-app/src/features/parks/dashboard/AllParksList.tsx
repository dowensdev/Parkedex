import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import ParkListItem from './ParkListItem';

export default observer(function AllParksList() {
    const {parkStore} = useStore();
    const {allParks} = parkStore;
    
    return (
        <>
            {allParks.map(([id, park]) => (
                <ParkListItem key={id} park={park}/>
            ))}
        </>      
    )
})