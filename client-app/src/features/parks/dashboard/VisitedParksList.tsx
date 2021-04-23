import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function VisitedParksList() {
    const {parkStore} = useStore();
    const {visitedParkList} = parkStore;

    return (
        <>
            {visitedParkList.length > 0 ? 
                <Menu style={{marginLeft:10}} vertical borderless>
                    <Header content='Your Parks' textAlign='center' style={{color:'white'}}/>
                    {visitedParkList.map(park => (
                        <Menu.Item>
                            {park.fullName}
                        </Menu.Item>
                    ))}
                </Menu> :
                <Header content='You have not visited any parks' textAlign='center'/>
            }
        </>
    )
})