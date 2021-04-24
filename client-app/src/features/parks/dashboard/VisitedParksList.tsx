import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function VisitedParksList() {
    const {userStore} = useStore();
    const {allVisited} = userStore;

    return (
        <>
            {allVisited.length > 0 ? 
                <Menu style={{marginLeft:10}} vertical borderless>
                    <Header content='Your Parks' textAlign='center' style={{marginTop:10}}/>
                    {allVisited.map((park) => (
                        <Menu.Item as={Link} to={`/parks/${park[0]}`}>
                            {park[1]}
                        </Menu.Item>
                    ))}
                </Menu> :
                <Header content='You have not visited any parks' textAlign='center'/>
            }
        </>
    )
})