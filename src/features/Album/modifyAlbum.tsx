import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../Context";
import {
  GetUserAlbumsDocument,
  useModifyAlbumMutation,
} from "../../graphql/graphql";


type StateType = { name : string, id : string};

const ModifyAlbum = () => {
  const history = useHistory();
  const state = history.location.state as StateType;

  const [name, setName] = useState(state.name);
  const {
    state: { loginUser },
  } = useContext(Context);
  const [modifyAlbum] = useModifyAlbumMutation();

  useEffect(() => {
    if (!loginUser) {
      alert("login needded");
      history.push("/");
    }
  });
  return (
    <>
      {loginUser && (
        <>
          <p>name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} />
          <button
            onClick={async () => {
              await modifyAlbum({
                variables: { id: state.id, name },
                refetchQueries: [
                  {
                    query: GetUserAlbumsDocument,
                    variables: { username: loginUser },
                  },
                ],
              });
              history.push({
                pathname: "/",
              });
            }}
          >
            modify
          </button>
        </>
      )}
      {!loginUser && (
        <>
          <p>back to main..</p>
        </>
      )}
    </>
  );
};

export default ModifyAlbum;
