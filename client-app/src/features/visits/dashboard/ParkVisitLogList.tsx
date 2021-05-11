import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { Park } from '../../../app/models/park';
import { VisitLog } from '../../../app/models/visitLog';
import { useStore } from '../../../app/stores/store';
import VisitLogDetails from '../details/VisitLogDetails';

interface Props {
    park: Park;
}

export default observer(function ParkVisitLogList({park}: Props) {
    const {visitLogStore} = useStore();
    const {visitLogsByPark} = visitLogStore;

    return (
        <>
            <Header as='h1' content='Visits' textAlign='center'/>
            <Divider></Divider>
            {visitLogsByPark(park.id).map((visitLog: VisitLog) => (
                <VisitLogDetails key={visitLog.id} visitLog={visitLog} />
            ))}
        </>      
    )
})