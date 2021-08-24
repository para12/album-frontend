import { ReactNode, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";
import Cookies from "js-cookie";

const Menu = styled.div`
  top: 0;
  right: 0;
  position: fixed;
  width: 200px;
  height: 50px;
  padding: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuLayout = ({ children }: { children: ReactNode }) => {
  const {
    state: { isLoggedIn },
    actions: { setIsLoggedIn },
  } = useContext(Context);
  const history = useHistory();

  return (
    <>
      <Menu>
        {isLoggedIn && (
          <div
            onClick={() => {
              Cookies.set("token", "");
              Cookies.set("refreshToken", "");
              setIsLoggedIn!(undefined);
              history.push("/");
              window.location.reload();
            }}
          >
            logout
          </div>
        )}
        {isLoggedIn === false && <Link to={{ pathname: "/login" }}>login</Link>}
      </Menu>
      {children}
    </>
  );
};

export default MenuLayout;
