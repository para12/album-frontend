import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Main from "./features/Main";
import Activate from "./features/Activate";
import Login from "./features/Login";
import Register from "./features/Register";
import MenuLayout from "./features/Menu";
import CreateAlbum from "./features/createAlbum";
import Album from "./features/Album";

const Router = () => {
  return (
    <BrowserRouter>
      <MenuLayout>
        <Switch>
          <Route exact={true} path="/" component={Main} />
          <Route exact={true} path="/activate/:token" component={Activate} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/createAlbum" component={CreateAlbum} />
          <Route exact={true} path="/album/:username" component={Album} />
          {/* <Route path="/Room/" component={Room} />   */}
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </MenuLayout>
    </BrowserRouter>
  );
};

export default Router;
