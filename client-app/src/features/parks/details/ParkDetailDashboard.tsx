import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoaderComponent from '../../../app/layout/LoaderComponent';
import { useStore } from '../../../app/stores/store';
import ParkCommentsSection from './ParkCommentsSection';
import ParkDetails from './ParkDetails';
import ParkMap from './ParkMap';

export default observer(function ParkDetailDashboard() {
    const {parkStore, userStore, mapStore, visitLogStore} = useStore();
    const {currentPark: park, loadingInitial, loadPark} = parkStore;
    const {mapScriptLoaded} = mapStore;
    const {getUser, setVisitedParks} = userStore;
    const {loadVisitLogs} = visitLogStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadPark(id); 
    }, [id, loadPark]);



    if (loadingInitial || !park) return <LoaderComponent content='Loading Park.'/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ParkDetails park={park}/>
                <ParkCommentsSection parkId={park.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {mapScriptLoaded && (
                    <ParkMap park={park}/>
                )}
            </Grid.Column>
        </Grid>
    )
})
