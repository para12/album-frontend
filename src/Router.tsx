import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Activate from "./features/Auth/Activate";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import MenuLayout from "./features/Menu";
import CreateAlbum from "./features/Album/createAlbum";
import ModifyAlbum from "./features/Album/modifyAlbum";
import Album from "./features/Album/Album";
import AlbumList from "./features/Album/AlbumList";

const Router = () => {
  return (
    <BrowserRouter>
      <MenuLayout>
        <Switch>
          <Route exact={true} path="/" component={AlbumList} />
          <Route exact={true} path="/activate/:token" component={Activate} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/CreateAlbum" component={CreateAlbum} />
          <Route exact={true} path="/ModifyAlbum" component={ModifyAlbum} />
          <Route exact={true} path="/album/" component={Album} />
          <Route exact={true} path="/:searchConfirmed" component={AlbumList} />
          {/* <Route path="/Room/" component={Room} />   */}
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </MenuLayout>
    </BrowserRouter>
  );
};

export default Router;
