import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './features/Main';
import Activate from './features/Activate';
import Login from './features/Login';
import Register from './features/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Main} />
        <Route exact={true} path="/activate/:token" component={Activate} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />
        {/* <Route path="/Room/" component={Room} />   */}
        {/* Not Found */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;