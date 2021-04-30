import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoaderComponent from '../../../app/layout/LoaderComponent';
import { useStore } from '../../../app/stores/store';
import ParkListItem from '../dashboard/ParkListItem';
import ParkCommentsSection from './ParkCommentsSection';
import ParkMap from './ParkMap';

export default observer(function ParkDetails() {
    const {parkStore, userStore, mapStore} = useStore();
    const {currentPark: park, loadingInitial, loadPark} = parkStore;
    const {mapScriptLoaded} = mapStore;
    const {getUser, setVisitedParks} = userStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadPark(id); 
    }, [id, loadPark]);

    useEffect(() => {
        if(getUser != null) setVisitedParks(); 
    }, [getUser, setVisitedParks])

    if (loadingInitial || !park) return <LoaderComponent content='Loading Park.'/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ParkListItem park={park}/>
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
