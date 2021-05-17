import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Label, Segment } from 'semantic-ui-react';
import { VisitLog } from '../../../app/models/visitLog';
import {format} from 'date-fns';
import VisitLogForm from '../form/VisitLogForm';
import { useStore } from '../../../app/stores/store';

interface Props {
    visitLog: VisitLog;
}

export default observer(function VisitLogDetails({visitLog}: Props) {
    const {modalStore, parkStore, visitLogStore} = useStore();
    const {deleteVisitLog, loadingVisits} = visitLogStore;
    const {currentPark: park} = parkStore;

    const [target, setTarget] = useState('');
    function changeTargetPark(e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
    }

    return (
        <Segment.Group>
                <Segment clearing>
                    <Header as={Link} to={`/visitlog/${visitLog.parkRef}`} style={{marginBottom:10}}>
                        {visitLog.title}
                    </Header>
                    
                    <Button
                        name={visitLog.id} 
                        loading={loadingVisits && target === visitLog.id}
                        onClick={(e) => {
                            changeTargetPark(e);
                            deleteVisitLog(visitLog.id);
                            }
                        }
                        color='red'
                        icon='x' 
                        floated='right'></Button>
                    <Button onClick={() =>
                        modalStore.openModal(<VisitLogForm park={park!} logId={visitLog.id} />)} 
                        icon='edit'
                        color='blue' 
                        floated='right' />
                </Segment>
                <Segment secondary clearing>
                    <Label as={Link} to={`/parks/${visitLog.parkRef}`} style={{marginBottom:10}}>
                        {visitLog.parkName}
                    </Label>
                    <Container>Start Date: {format(visitLog.startDate!, 'dd MMM yyyy')}</Container>
                    <Container>End Date: {format(visitLog.endDate!, 'dd MMM yyyy')}</Container>
                </Segment>
                <Segment>
                    <Container>{visitLog.notes}</Container>
                </Segment>
        </Segment.Group>
    )
})