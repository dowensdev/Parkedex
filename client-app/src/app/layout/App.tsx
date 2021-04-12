import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ParkDashboard from '../../features/parks/dashboard/ParkDashboard';
import NavBar from './NavBar';

function App() {
  

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Route path='/' component={ParkDashboard} />
      </Container>
          
    </>
  );
}

export default App;
