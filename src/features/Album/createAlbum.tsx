import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useCreateAlbumMutation,
  GetUserAlbumsDocument,
} from "../../graphql/graphql";
import { Context } from "../../Context";

const CreateAlbum = () => {
  const [name, setName] = useState<string>("");
  const [createAlbum] = useCreateAlbumMutation();
  const history = useHistory();
  const {
    state: { loginUser },
  } = useContext(Context);
  
  useEffect(() => {
    if (!loginUser) {
      alert('login needded');
      history.push("./");
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
              await createAlbum({
                variables: { name },
                refetchQueries: [{ query: GetUserAlbumsDocument, variables : { username : loginUser} }],
              });
              history.push("/");
            }}
          >
            create
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

export default CreateAlbum;
