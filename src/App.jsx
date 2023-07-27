import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login';
import BuscarExpediente from './components/Dashboard';
import InsertarExpediente from './components/ExpedienteForm';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/PageContent" component={PageContent} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/buscar" component={BuscarExpediente} />
        <Route exact path="/insertar" component={InsertarExpediente} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
