import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Grid, List } from 'semantic-ui-react'
import { Park } from '../../../app/models/park';
import ParkListItem from './ParkListItem';

export default function ParkDashboard() {
    const [parks, setParks] = useState<Park[]>([]);

    useEffect(() => {
      axios.get<Park[]>('https://localhost:44338/api/Parks').then(response => {
        console.log(response)
        setParks(response.data);
      })
    }, [])

    return (
        <>
            <Grid>
                <Grid.Column width='11'>
                    <List style={{marginLeft:10}}>
                        {parks.map(park => (
                            <ParkListItem key={park.id} park={park}/>
                        ))}
                    </List>
                </Grid.Column>
                <Grid.Column width='5'>
                    <List style={{marginLeft:10}}>
                        {parks.map(park => (
                            <List.Item>
                                {park.fullName}
                            </List.Item>
                        ))}
                    </List>
                </Grid.Column>
            </Grid>
        </>
    )
}