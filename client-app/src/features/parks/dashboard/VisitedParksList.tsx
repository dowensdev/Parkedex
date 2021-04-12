import React from 'react';
import { Header, List } from 'semantic-ui-react';
import { Park } from '../../../app/models/park';

interface Props {
    parks: Park[],
}

export default function VisitedParksList({parks}: Props) {
    let noVisited = false;

    return (
        <>
            {noVisited ? <Header content='You have not visited any parks' /> :
            <List style={{marginLeft:10}}>
                {parks.map(park => (
                    <List.Item>
                        {park.fullName}
                    </List.Item>
                ))}
            </List>
            }
        </>
    )
}