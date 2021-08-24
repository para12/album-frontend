import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLoginMutation } from "../graphql/graphql";
import Cookies from "js-cookie";

const Login = () => {
  const [verifyAccount, { data, loading, error }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let loginError = "";
  const history = useHistory();

  if (!loading && !error) {
    if (data?.tokenAuth?.success) {
      Cookies.set("token", data.tokenAuth.token as string);
      Cookies.set("refreshToken", data.tokenAuth.refreshToken as string);
      history.push("./");
    }
    if (!data?.tokenAuth?.success) {
      loginError = data?.tokenAuth?.errors.nonFieldErrors[0].message;
    }
  }
  return (
    <>
      <div>
        username :
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      <div>
        password :
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          // type="password"
        />
      </div>
      <button
        onClick={() => {
          verifyAccount({ variables: { username, password } });
          setUsername("");
          setPassword("");
        }}
      >
        login
      </button>
      <div>{loginError}</div>
      <div>
        <Link to={{ pathname: "/register" }}>to register</Link>
      </div>
    </>
  );
};

export default Login;
