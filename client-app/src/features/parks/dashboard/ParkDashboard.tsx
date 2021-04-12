import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { Park } from '../../../app/models/park';
import agent from '../../../app/api/agent';
import AllParksList from './AllParksList';
import VisitedParksList from './VisitedParksList';

export default function ParkDashboard() {
    const [parks, setParks] = useState<Park[]>([]);

    useEffect(() => {
      agent.Parks.getAll().then(data => {
        console.log(data)
        setParks(data);
      })
    }, [])

    return (
        <>
            <Grid>
                <Grid.Column width='11'>
                    <AllParksList parks={parks}/>
                </Grid.Column>
                <Grid.Column width='5'>
                    <VisitedParksList parks={parks}/>
                </Grid.Column>
            </Grid>
        </>
    )
}