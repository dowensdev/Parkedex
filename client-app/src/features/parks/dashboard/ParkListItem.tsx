import React from 'react';
import { Button, Card, Icon, Image, Item, Segment } from 'semantic-ui-react';
import { Park } from '../../../app/models/park';

interface Props {
    park: Park
}
export default function ParkListItem({park}: Props) {
    
    return (
        <Card fluid>
            {park.fullName === 'Biscayne National Park' ?
                <Image src={park.images[1].url} size='huge' bordered centered fluid/> :
                <Image src={park.images[0].url} size='huge' bordered centered fluid/>
            }
            <Card.Content borderless>
                <Card.Header>{park.fullName}</Card.Header>

            <Card.Description>
                {park.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                    <Icon link name='check' size='large' style={{float:'right'}}/>
            </Card.Content>
        </Card>
    )
}