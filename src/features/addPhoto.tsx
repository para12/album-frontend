import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  useCreateAlbumMutation,
  GetAllAlbumsDocument,
} from "../graphql/graphql";
import { Context } from "../Context";

const addPhoto = () => {
  const [name, setName] = useState<string>("");
  const [createAlbum] = useAddPhotoMutation();
  const history = useHistory();
  const {
    state: { isLoggedIn },
  } = useContext(Context);

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

export default addPhoto;
