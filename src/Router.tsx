import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './features/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Main} />
        {/* <Route path="/CreateRoom" component={CreateRoom} />
        <Route path="/Room/" component={Room} />  */}
        {/* Not Found */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;