import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Player from './components/player/Player';
const Home = lazy(() => import('./screens/Home'));

const StyledContainer = styled.div`
  width: 90%;
  margin: auto;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

// This is my first time using "something" as a param
// something means track, artist, album, etc.

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<h1>Loading...</h1>}>
          <StyledContainer>
            <Switch>
              <Route path="/search/:something" exact component={Home} />
            </Switch>
          </StyledContainer>
          <Player />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
