import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import ExpedienteForm from './components/expedienteForm'


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/expedienteForm" component={ExpedienteForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
