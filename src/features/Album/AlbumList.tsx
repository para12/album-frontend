import { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useGetUserAlbumsQuery } from "../../graphql/graphql";
import { MainContainer } from "../../assets/styles/wrappers";
import { Context } from "../../Context";
import AlbumCard from "./AlbumCard";

const AlbumHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateAlbumButton = styled.button`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  padding: 30px;
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
`;

const AlbumBody = styled.div`
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

type activationParamType = {
  searchConfirmed: string | undefined;
};
const Main = () => {
  const { searchConfirmed } = useParams<activationParamType>();
  const {
    state: { loginUser },
  } = useContext(Context);
  const [search, setSearch] = useState("");
  const albumListQueryVariable = searchConfirmed
    ? searchConfirmed
    : typeof loginUser === "string"
    ? loginUser
    : "";
  const { data, loading } = useGetUserAlbumsQuery({
    variables: {
      username: albumListQueryVariable,
    },
  });

  const history = useHistory();


  return (
    <>
      {loading && <div>loading...</div>}
      {!loading && data && (
        <MainContainer>
          <AlbumHeader>
            {loginUser && (
              <CreateAlbumButton onClick={() => history.push("/CreateAlbum")}>
                Create Album +
              </CreateAlbumButton>
            )}
            <SearchArea>
              <p>search</p>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={() => history.push(`/${search}`)}>go</button>
            </SearchArea>
          </AlbumHeader>

          <AlbumBody>
            <AlbumListWrapper>
              {data.userAlbums!.map((album) => {
                return (
                  <AlbumCard
                    key={album!.name}
                    name={album!.name}
                    id={album!.id}
                    isMenu={loginUser === album!.owner.username}
                    albumListQueryVariable={albumListQueryVariable}
                    // username={loginUser as string}
                  />
                );
              })}
            </AlbumListWrapper>
          </AlbumBody>
        </MainContainer>
      )}
    </>
  );
};

export default Main;
