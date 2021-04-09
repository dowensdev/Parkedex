import React from 'react';
import { Container } from 'semantic-ui-react';
import ParkDashboard from '../../features/parks/dashboard/ParkDashboard';
import NavBar from './NavBar';

function App() {
  

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ParkDashboard />
      </Container>
          
    </>
  );
}

export default App;
