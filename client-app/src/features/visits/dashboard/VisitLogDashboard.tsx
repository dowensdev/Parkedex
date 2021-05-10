import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoaderComponent from '../../../app/layout/LoaderComponent';
import { useStore } from '../../../app/stores/store';
import ParkDetails from '../../parks/details/ParkDetails';
import ParkMap from '../../parks/details/ParkMap';
import VisitLogList from '../dashboard/VisitLogList';

export default observer(function VisitLogDashboard() {
    const {visitLogStore, parkStore, userStore, mapStore} = useStore();
    const { loadVisitLogs } = visitLogStore;
    const { getUser, setVisitedParks, isLoggedIn} = userStore;
    const { currentPark, loadPark, clearPark } = parkStore;
    const {mapScriptLoaded} = mapStore;
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        loadPark(id);
        return() => {
            clearPark()
        } 
    }, [loadPark, clearPark, id]);

    useEffect(() => {
        if(getUser != null) {
            setVisitedParks();
            loadVisitLogs();
        } 
    }, [getUser, setVisitedParks, loadVisitLogs])
    
    if (!currentPark || !isLoggedIn) return <LoaderComponent content='Loading Visit Details'/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ParkDetails park={currentPark}/>
                <VisitLogList park={currentPark}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {mapScriptLoaded && (
                    <ParkMap park={currentPark}/>
                )}
            </Grid.Column>
        </Grid>
    )
})