import { observer } from 'mobx-react-lite';
import React from 'react';
import Search from '../../../app/common/search/Search';
import { useStore } from '../../../app/stores/store';
import ParkDetails from '../details/ParkDetails';

export default observer(function AllParksList() {
    const {parkStore} = useStore();
    const {allParks} = parkStore;
    
    return (
        <>
            {allParks.map(([id, park]) => (
                <ParkDetails key={id} park={park}/>
            ))}
        </>      
    )
})