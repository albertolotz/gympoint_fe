import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// paginas
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import Assistance from '../pages/Assistance';
import Plans from '../pages/Plans';
import PlansEdit from '../pages/Plans/EditPlan';
import PlansAdd from '../pages/Plans/AddPlan';
import Registries from '../pages/Registries';
import RegistriesAdd from '../pages/Registries/AddRegistries';
import RegistriesEdit from '../pages/Registries/EditRegistries';
import Students from '../pages/Students';
import StudentsEdit from '../pages/Students/EditStudent';
import StudentsAdd from '../pages/Students/AddStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/main" component={Main} isPrivate />

      <Route path="/assistance" component={Assistance} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/plansedit/:id" component={PlansEdit} isPrivate />
      <Route path="/plansadd" component={PlansAdd} isPrivate />

      <Route path="/registries" component={Registries} isPrivate />
      <Route path="/registriesadd" component={RegistriesAdd} isPrivate />
      <Route path="/registriesedit/:id" component={RegistriesEdit} isPrivate />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/studentsedit/:id" component={StudentsEdit} isPrivate />
      <Route path="/studentsadd" component={StudentsAdd} isPrivate />
    </Switch>
  );
}
