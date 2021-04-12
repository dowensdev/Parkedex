import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function VisitedParksList() {
    const {parkStore} = useStore();
    const {visitedParkList} = parkStore;

    return (
        <>
            {visitedParkList.length > 0 ? 
                <List style={{marginLeft:10}}>
                    {visitedParkList.map(park => (
                        <List.Item>
                            {park.fullName}
                        </List.Item>
                    ))}
                </List> :
                <Header content='You have not visited any parks' />
            }
        </>
    )
})