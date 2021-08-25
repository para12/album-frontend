import { useEffect } from "react";
import { useVerifyAccountMutation } from "../../graphql/graphql";
import { useParams, useHistory } from "react-router-dom";

type activationParamType = {
  token: string;
};

const Activate = () => {
  const { token } = useParams<activationParamType>();
  const [verifyAccount, { data, loading }] = useVerifyAccountMutation();
  const history = useHistory();

  useEffect(()=>{
    verifyAccount({variables : {token}})
  },[token, verifyAccount])

  useEffect(() => {
    let timer: any;
    if (!loading && data) {
      timer = setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loading, data, history]);

  return (
    <>
      {loading && (
        <div>
          checking...
        </div>
      )}
      {!loading && data && (
        <>
          {data.verifyAccount?.success && <div>verified</div>}
          {!data.verifyAccount?.success && (
            <div>{data.verifyAccount?.errors.nonFieldErrors[0].message}</div>
          )}
          <div>Move to Login Page in 3 seconds</div>
        </>
      )}
    </>
  );
};

export default Activate;
