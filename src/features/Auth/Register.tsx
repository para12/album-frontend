import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../graphql/graphql";

const Register = () => {
  const [register, { data, loading, error }] = useRegisterMutation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let registerError = [""];
  let successMessage = null;

  if (!loading && !error) {
    if (data?.register?.success) {
      successMessage = "go check your email";
    }
    if (!data?.register?.success) {
      let errMsgs = data?.register?.errors;
      if (errMsgs) {
        Object.keys(errMsgs).forEach((key) => {
          registerError.push(errMsgs[key][0]["message"]);
        });
      }
    }
  }
  return (
    <>
      {!successMessage && (
        <>
          <div>
            username :
            <input
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>
          <div>
            email :
            <input
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
            />
          </div>
          <div>
            password :
            <input
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              value={password}
              // type="password"
            />
          </div>
          <div>
            password confirm :
            <input
              onChange={(e) => {
                e.preventDefault();
                setPasswordConfirm(e.target.value);
              }}
              value={passwordConfirm}
              // type="password"
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              register({
                variables: {
                  username,
                  email,
                  password1: password,
                  password2: passwordConfirm,
                },
              });
              // setUsername("");
              // setEmail("");
              // setPassword("");
              // setPasswordConfirm("");
            }}
          >
            register
          </button>
          <div>
            {registerError.map((key, index) => (
              <div key={index}>{key}</div>
            ))}
          </div>
          <div>
            <Link to={{ pathname: "/login" }}>to login</Link>
          </div>
        </>
      )}

      {successMessage && <div>{successMessage}</div>}
    </>
  );
};

export default Register;
