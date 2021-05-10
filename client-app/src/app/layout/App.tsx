import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ServerError from '../../features/errors/ServerError';
import ParkDashboard from '../../features/parks/dashboard/ParkDashboard';
import ParkDetailDashboard from '../../features/parks/details/ParkDetailDashboard';
import ProfileDashboard from '../../features/profiles/ProfileDashboard';
import SplashPage from '../../features/splash/SplashPage';
import LoginForm from '../../features/users/LoginForm';
import VisitLogDashboard from '../../features/visits/dashboard/VisitLogDashboard';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import LoaderComponent from './LoaderComponent';
import NavBar from './NavBar';

function App() {
  const {commonStore, userStore, mapStore, visitLogStore} = useStore();

  useEffect(() => {
    if (commonStore.token) { 
        userStore.getUser().then(() => userStore.setVisitedParks())
          .then(() => visitLogStore.loadVisitLogs)
          .finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  useEffect(() => {
    if(!mapStore.mapScriptLoaded) mapStore.loadMapApi(); 
  }, [mapStore])

  if (!commonStore.appLoaded) return <LoaderComponent content='Loading app...' />

  return (
    <>
    <ModalContainer />
    <Route exact path='/' component={SplashPage} /> 
      <Route
        path={'/(.+)'}
        render={() => {
          return (
            <>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Route exact path='/parks' component={ParkDashboard} />
                <Route path='/parks/:id' component ={ParkDetailDashboard} />
                <Route path='/visitlog/:id' component ={VisitLogDashboard} />
                <Route path='/login' component={LoginForm} />
                <Route path='/profile/:username' component={ProfileDashboard} />
                <Route path='/server-error' component={ServerError} />
              </Container>
            </>
          );
        }}
      />
    </>
  );
}

export default observer(App);
