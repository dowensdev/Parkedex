import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { VisitLog } from '../../../app/models/visitLog';
import {format} from 'date-fns';

interface Props {
    visitLog: VisitLog;
}

export default observer(function VisitLogDetails({visitLog}: Props) {

    return (
        <Segment.Group>
                <Segment clearing>
                    <Header as={Link} to={`/visitlog/${visitLog.id}`} style={{marginBottom:10}}>
                        {visitLog.title}
                    </Header>
                    <Button icon='x' floated='right'></Button>
                    <Button icon='edit' floated='right'></Button>
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