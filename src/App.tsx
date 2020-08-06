import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress'
import About from './routes/About'
import Home from './routes/Home'

const AppLoader = () => {
  return <LinearProgress />
}

function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  );
}

export default App;
