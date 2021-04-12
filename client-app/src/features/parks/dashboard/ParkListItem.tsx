import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Park } from '../../../app/models/park';

interface Props {
    park: Park
}
export default function ParkListItem({park}: Props) {
    
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{park.fullName}</Card.Header>
            </Card.Content>
                {park.fullName === 'Biscayne National Park' ?
                    <Image src={park.images[1].url} size='huge' bordered centered fluid/> :
                    <Image src={park.images[0].url} size='huge' bordered centered fluid/>
                }
            <Card.Content>
                <Card.Description>
                    {park.description}
                </Card.Description>
                <Card.Description>
                    States: {park.states}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                    <Icon link name='check' size='large' style={{float:'right'}}/>
            </Card.Content>
        </Card>
    )
}