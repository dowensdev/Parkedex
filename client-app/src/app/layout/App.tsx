import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ParkDashboard from '../../features/parks/dashboard/ParkDashboard';
import ParkDetails from '../../features/parks/details/ParkDetails';
import SplashPage from '../../features/splash/SplashPage';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import LoaderComponent from './LoaderComponent';
import NavBar from './NavBar';

function App() {
  //const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoaderComponent content='Loading app...' />

  return (
    <>
    <ModalContainer />
    <Route exact path='/' component={SplashPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Route exact path='/parks' component={ParkDashboard} />
              <Route path='/parks/:id' component={ParkDetails} />
              <Route path='/login' component={LoginForm}/>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
