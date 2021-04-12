import { observer } from 'mobx-react-lite';
import React from 'react';
import { List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ParkListItem from './ParkListItem';


export default observer(function AllParksList() {
    const {parkStore} = useStore();
    const {allParkList} = parkStore;
    
    return (
        <List style={{marginLeft:10}}>
            {allParkList.map(park => (
                <ParkListItem key={park.id} park={park}/>
            ))}
        </List>
    )
})