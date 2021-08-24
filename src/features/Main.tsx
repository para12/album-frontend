import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useGetAllAlbumsQuery } from "../graphql/graphql";
import { MainContainer } from "../assets/styles/wrappers";
import { Context } from "../Context";

interface AlbumType {
  name: string;
  createdAt: string;
}

const MainHeader = styled.button`
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

const AlbumWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border: grey 1px dashed;
`;



const Main = () => {
  const { data, loading } = useGetAllAlbumsQuery();
  const [albumList, setAlbumList] = useState<Array<AlbumType | null>>();
  const history = useHistory();

  const {
    state: { isLoggedIn },
  } = useContext(Context);

  useEffect(() => {
    if (data) {
      setAlbumList(data!.allAlbums!);
    }
  }, [data, loading]);

  return (
    <>
      {albumList && (
        <MainContainer>
          {isLoggedIn && <MainHeader onClick={() => history.push('./createAlbum')} >Create Album + </MainHeader>}

          <MainBody>
            <AlbumListWrapper>
              {albumList.map((album) => {
                return (
                  <AlbumWrapper key={album?.name}>
                    <Link to={{ pathname: `/album/:${isLoggedIn}`}}> <h2>{album!.name}</h2> </Link>
                  </AlbumWrapper>
                );
              })}
            </AlbumListWrapper>
          </MainBody>
        </MainContainer>
      )}
    </>
  );
};

export default Main;
