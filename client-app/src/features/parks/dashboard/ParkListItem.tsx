import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item, Image, Button, Segment, Container, Label, Popup, List} from 'semantic-ui-react';
import { Park } from '../../../app/models/park';
import { useStore } from '../../../app/stores/store';

interface Props {
    park: Park
}

export default observer(function ParkListItem({park}: Props) {
    const {userStore, parkStore} = useStore();
    const {addVisitedPark, hasVisited, removeVisitedPark, loadingButtons, isLoggedIn} = userStore;
    const {getCurrentImage, updateCurrentImage} = parkStore;
    
    const [target, setTarget] = useState('');
    function changeTargetPark(e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
    }

    return (
        <Segment.Group key={park.id}>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/parks/${park.id}`} style={{marginBottom:10}}>
                                {park.fullName}
                            </Item.Header>
                            <Popup
                                hoverable
                                position='left center'
                                trigger={
                                    <Button onClick={() => updateCurrentImage(park.id)}style={{margins:'0', padding:'0'}}>
                                        <Image src={park.images[getCurrentImage(park.id) || 0].url} size='huge' fluid/>
                                    </Button>
                                }
                            >
                                <Popup.Content>
                                    <List>
                                        <List.Item>{park.images[getCurrentImage(park.id)!].title}</List.Item>
                                        <List.Item>Credit: {park.images[getCurrentImage(park.id) || 0].credit}</List.Item>
                                        <List.Item><a href={park.images[getCurrentImage(park.id) || 0].url}>{park.images[0].url}</a></List.Item>
                                    </List>
                                </Popup.Content>
                            </Popup>
                            <Item.Description>
                                {park.description}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment secondary clearing>
                <Label size='medium' style={{float: 'right'}}>States: {park.states}</Label>
                <Container>Latitude: {park.latLong.split(",")[0].split(":")[1]}</Container>
                <Container>Longitude: {park.latLong.split(",")[1].split(":")[1]}</Container>
            </Segment>  
            <Segment clearing>
                {(park.visitorCount === 1) ?
                    <Label size='large'>{park.visitorCount} user has visited this park.</Label> :
                    <Label size='large'>{park.visitorCount} users have visited this park.</Label>
                }
                {isLoggedIn && hasVisited(park.id) ? (
                        <Button name={park.id} 
                            loading={loadingButtons && target === park.id} 
                            disabled={loadingButtons && target === park.id} 
                            onClick={(e) => {
                                changeTargetPark(e);
                                removeVisitedPark(park);
                                }
                            } 
                            content='Visited' 
                            icon='check' 
                            style={{float:'right', color: 'green'}} />
                    ) : (
                        <Button name={park.id} 
                            loading={loadingButtons && target === park.id} 
                            disabled={loadingButtons && target === park.id} 
                            onClick={(e) => {
                                changeTargetPark(e);
                                addVisitedPark(park);
                                }
                            } 
                            content = 'Not Visited'
                            icon='x' 
                            style={{float:'right', color: 'red'}} />
                    )
                }
            </Segment>
        </Segment.Group>
    )
})
