import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ServerError from '../../features/errors/ServerError';
import ParkDashboard from '../../features/parks/dashboard/ParkDashboard';
import ParkDetailDashboard from '../../features/parks/details/ParkDetailDashboard';
import ProfileDashboard from '../../features/profiles/ProfileDashboard';
import SplashPage from '../../features/splash/SplashPage';
import VisitLogDashboard from '../../features/visits/dashboard/VisitLogDashboard';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import LoaderComponent from './LoaderComponent';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';

function App() {
  const {commonStore, userStore, mapStore, visitLogStore} = useStore();

  //if token exists attempts to get user info. If successfully loads visited parks list
  //then loads all visit logs and then opens app
  useEffect(() => {
    if (commonStore.token) { 
        userStore.getUser().then(() => userStore.setVisitedParks())
          .then(() => visitLogStore.loadVisitLogs)
          .finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore, visitLogStore])

  //checks if map script appears in root html and if not loads helper function from map store
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
                <PrivateRoute path='/visitlog/:id' component ={VisitLogDashboard} />
                <PrivateRoute path='/profile/:username' component={ProfileDashboard} />
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
