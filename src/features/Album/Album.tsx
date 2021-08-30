import { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useGetAlbumPhotosQuery } from "../../graphql/graphql";
import { MainContainer } from "../../assets/styles/wrappers";
import { Context } from "../../Context";
import PhotoCard from './PhotoCard';

const AlbumHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddPhotoButton = styled.button`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  padding: 30px;
`;

const MainBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AlbumListWrapper = styled.div`
  min-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
`;

type StateType = { album : {id: string, name: string, owner : { username : string} }};

const Album = () => {
  const history = useHistory();
  const state = history.location.state as StateType;
  const { data, loading } = useGetAlbumPhotosQuery({
    variables: {
      albumId: state.album.id,
    },
  });

  const {
    state: { loginUser },
  } = useContext(Context);

  //albumId 와 ownername

  return (
    <>
      {!loading && data && (
        <MainContainer>
          <AlbumHeader>
            <h1>{state.album.name}</h1>

            {loginUser === state.album.owner.username && (
              <AddPhotoButton
                onClick={() =>
                  history.push({
                    pathname: "/addPhoto",
                    state: { album : state.album },
                  })
                }
              >
                Add Photo +
              </AddPhotoButton>
            )}
          </AlbumHeader>

          <MainBody>
            <AlbumListWrapper>
              {data.albumPhotos!.map((photo) => {
                return (
                  <PhotoCard key={photo!.id} albumId={state.album.id} photo={photo!} loginUser={loginUser as string} />
                );
              })}
            </AlbumListWrapper>
          </MainBody>
        </MainContainer>
      )}
    </>
  );
};

export default Album;
