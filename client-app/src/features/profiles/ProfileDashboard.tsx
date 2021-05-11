import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import AllVisitLogList from '../visits/AllVisitLogList';
import ProfileHeader from './ProfileHeader';

export default observer(function ProfilePage() {
    const { userStore } = useStore();
    const { user } = userStore;

    return (
        <Grid>
            <Grid.Column width={16}>
                {user &&
                    <>
                        <ProfileHeader user={user} />
                        <AllVisitLogList />
                    </>}
            </Grid.Column>
        </Grid>
    )
})