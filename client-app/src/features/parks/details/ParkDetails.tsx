import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoaderComponent from '../../../app/layout/LoaderComponent';
import { useStore } from '../../../app/stores/store';
import { loadMapApi } from '../../../app/utils/GoogleMapUtils';
import ParkListItem from '../dashboard/ParkListItem';
import ParkMap from './ParkMap';

interface Props {
    scriptLoaded: boolean
}

export default observer(function ParkDetails(scriptLoaded: Props) {
    const {parkStore, userStore} = useStore();
    const {currentPark: park, loadingInitial, loadPark} = parkStore;
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
            </Grid.Column>
            <Grid.Column width={6}>
                {console.log(scriptLoaded)}
                {scriptLoaded && (
                    <ParkMap mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} park={park}/>
                )}
            </Grid.Column>
        </Grid>
    )
})
