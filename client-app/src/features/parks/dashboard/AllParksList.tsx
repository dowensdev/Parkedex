import React from 'react';
import { List } from 'semantic-ui-react';
import { Park } from '../../../app/models/park';
import ParkListItem from './ParkListItem';

interface Props {
    parks: Park[]
}

export default function AllParksList({parks}: Props) {
    
    return (
        <List style={{marginLeft:10}}>
            {parks.map(park => (
                <ParkListItem key={park.id} park={park}/>
            ))}
        </List>
    )
}