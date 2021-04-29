import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item, Image, Button, Segment, Container, Label} from 'semantic-ui-react';
import { Park } from '../../../app/models/park';
import { useStore } from '../../../app/stores/store';

interface Props {
    park: Park
}

export default observer(function ParkListItem({park}: Props) {
    const {userStore} = useStore();
    const {addVisitedPark, hasVisited, removeVisitedPark, loadingButtons, isLoggedIn} = userStore;
    
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
                <Label size='medium' style={{float: 'right'}}>States: {park.states}</Label>
                <Container>Latitude: {park.latLong.split(",")[0].split(":")[1]}</Container>
                <Container>Longitude: {park.latLong.split(",")[1].split(":")[1]}</Container>
            </Segment>  
            <Segment clearing>
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
