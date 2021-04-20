import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Park } from '../../../app/models/park';
import { useStore } from '../../../app/stores/store';

interface Props {
    park: Park
}

export default observer(function ParkListItem({park}: Props) {
    const {parkStore} = useStore();
    const {setVisitedPark} = parkStore;
    
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
                    <Button onClick={() => setVisitedPark(park)} icon='check'style={{float:'right', background:'#5C9980'}} />
            </Card.Content>
        </Card>
    )
})
