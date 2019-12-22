import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// paginas
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import Assistance from '../pages/Assistance';
import Plans from '../pages/Plans';
import Registries from '../pages/Registries';
import Students from '../pages/Students';
import StudentsEdit from '../pages/Students/EditStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/main" component={Main} isPrivate />
      <Route path="/assistance" component={Assistance} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registries" component={Registries} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/studentsedit/:id" component={StudentsEdit} isPrivate />
    </Switch>
  );
}
