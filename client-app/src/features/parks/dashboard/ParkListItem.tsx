import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Image, Button, Segment, Container} from 'semantic-ui-react';
import { Park } from '../../../app/models/park';
import { useStore } from '../../../app/stores/store';

interface Props {
    park: Park
}

export default observer(function ParkListItem({park}: Props) {
    const {parkStore} = useStore();
    const {setVisitedPark} = parkStore;
    
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/parks/${park.id}`} style={{marginBottom:10}}>
                                {park.fullName}
                            </Item.Header>
                            {park.fullName === 'Biscayne National Park' ?
                                <Image src={park.images[1].url} size='huge' bordered centered /> :
                                <Image src={park.images[0].url} size='huge' bordered centered />
                            }
                            <Item.Description>
                                {park.description}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment secondary clearing>
                <Button size='tiny' floated='right'>States: {park.states}</Button>
                <Container>Latitude: {park.latLong.split(",")[0].split(":")[1]}</Container>
                <Container>Longitude: {park.latLong.split(",")[1].split(":")[1]}</Container>
            </Segment>  
            <Segment clearing>
                <Button onClick={() => setVisitedPark(park)} icon='check'style={{float:'right', background:'#5C9980'}} floated='right' />
            </Segment>
        </Segment.Group>
    )
})
