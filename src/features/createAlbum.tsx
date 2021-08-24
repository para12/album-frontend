import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  useCreateAlbumMutation,
  GetAllAlbumsDocument,
} from "../graphql/graphql";
import { Context } from "../Context";

const CreateAlbum = () => {
  const [name, setName] = useState<string>("");
  const [createAlbum] = useCreateAlbumMutation();
  const history = useHistory();
  const {
    state: { isLoggedIn },
  } = useContext(Context);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("./");
    }
  });
  return (
    <>
      {isLoggedIn && (
        <>
          <p>name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} />
          <button
            onClick={async () => {
              await createAlbum({
                variables: { name },
                refetchQueries: [{ query: GetAllAlbumsDocument }],
              });
              history.push("/");
            }}
          >
            create
          </button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <p>back to main..</p>
        </>
      )}
    </>
  );
};

export default CreateAlbum;
