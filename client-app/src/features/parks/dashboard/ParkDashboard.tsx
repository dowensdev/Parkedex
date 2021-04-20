import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllParksList from './AllParksList';
import VisitedParksList from './VisitedParksList';

export default function ParkDashboard() {

    return (
        <>
            <Grid>
                <Grid.Column width='11'>
                    <AllParksList />
                </Grid.Column>
                <Grid.Column width='5'>
                    <VisitedParksList />
                </Grid.Column>
            </Grid>
        </>
    )
}