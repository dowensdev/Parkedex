import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ServerError from '../../features/errors/ServerError';
import ParkDashboard from '../../features/parks/dashboard/ParkDashboard';
import ParkDetails from '../../features/parks/details/ParkDetails';
import SplashPage from '../../features/splash/SplashPage';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import { loadMapApi } from '../utils/GoogleMapUtils';
import LoaderComponent from './LoaderComponent';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function() {
        setScriptLoaded(true);
    });
  });

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
                <Route path='/parks/:id' render={(props) => (<ParkDetails {...props} scriptLoaded={scriptLoaded} />)} />
                <Route path='/login' component={LoginForm} />
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
