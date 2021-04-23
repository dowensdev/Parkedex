import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item, Image, Button, Segment, Container, Grid, Loader } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import VisitedParksList from '../dashboard/VisitedParksList';

export default observer(function ParkDetails() {
    const {parkStore} = useStore();
    const {currentPark: park, loadingInitial, setVisitedPark, loadPark} = parkStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadPark(id); 
    }, [id, loadPark]);

    if (loadingInitial || !park) return <Loader />;

    return (
        <Grid>
            <Grid.Column width={10}>
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
                        <Button icon='check'style={{float:'right', background:'#5C9980'}} floated='right' />
                    </Segment>
                </Segment.Group>
            </Grid.Column>
            <Grid.Column width={6}>
                <VisitedParksList />
            </Grid.Column>
        </Grid>
        
    )
})
