import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { VisitLog } from '../../../app/models/visitLog';
import {format} from 'date-fns';
import VisitLogForm from '../form/VisitLogForm';
import { useStore } from '../../../app/stores/store';

interface Props {
    visitLog: VisitLog;
}

export default observer(function VisitLogDetails({visitLog}: Props) {
    const history = useHistory();
    const {modalStore, parkStore, visitLogStore} = useStore();
    const {deleteVisitLog} = visitLogStore;
    const {currentPark: park} = parkStore;

    return (
        <Segment.Group>
                <Segment clearing>
                    <Header as={Link} to={`/visitlog/${visitLog.parkRef}`} style={{marginBottom:10}}>
                        {visitLog.title}
                    </Header>
                    <Button 
                        onClick={() => deleteVisitLog(visitLog.id).then(() => history.push(`/visitlog/${visitLog.parkRef}`))}
                        icon='x' 
                        floated='right'></Button>
                    <Button onClick={() =>
                        modalStore.openModal(<VisitLogForm park={park!} logId={visitLog.id} />)} 
                        icon='edit' 
                        floated='right' />
                </Segment>
                <Segment secondary clearing>
                    <Container>Start Date: {format(visitLog.startDate!, 'dd MMM yyyy')}</Container>
                    <Container>End Date: {format(visitLog.endDate!, 'dd MMM yyyy')}</Container>
                </Segment>
                <Segment>
                    <Container>{visitLog.notes}</Container>
                </Segment>
        </Segment.Group>
    )
})