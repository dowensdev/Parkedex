import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoaderComponent from '../../../app/layout/LoaderComponent';
import { useStore } from '../../../app/stores/store';
import AllParksList from './AllParksList';
import VisitedParksList from './VisitedParksList';

export default observer(function ParkDashboard() {
    const {userStore} = useStore();
    const {getUser, setVisitedParks, loadingVisitedList, isLoggedIn} = userStore;

    useEffect(() => {
        if(getUser != null) setVisitedParks(); 
    }, [getUser, setVisitedParks])

    if (isLoggedIn && loadingVisitedList)  return <LoaderComponent content='Loading Visited Parks' />;

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
})