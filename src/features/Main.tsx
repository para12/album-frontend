import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGetAllAlbumsQuery } from "../graphql/graphql";
import { MainContainer } from "../assets/styles/wrappers";
import { Context } from "../Context"

interface AlbumType {
  name: string;
  createdAt: string;
}

const MainHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const LineStyle = styled.div`
  margin-top: 20px;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const OneColumn = styled.div`
  width: 200px;
`;

const Menu = styled.div`
  top: 0;
  right: 0;
  position: fixed;
  width: 200px;
  height: 50px;
  padding: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateButton = styled.div``;

const Line = ({ contents }: { contents: { type: string; data: string[] } }) => {
  let isLink = contents.type === "body";
  return (
    <LineStyle>
      {contents.data.map((content, index) => (
        <OneColumn key={index}>
          {isLink && index === 0 ? (
            <Link to={{ pathname: "/Room", state: { code: content } }}>
              {content}
            </Link>
          ) : (
            content
          )}
        </OneColumn>
      ))}
    </LineStyle>
  );
};

const Main = () => {
  const { data, loading } = useGetAllAlbumsQuery();
  // const { data: meData, loading: meLoading } = useMeQuery();
  const [albumList, setAlbumList] = useState<Array<AlbumType | null>>();
  // const [me, setMe] = useState<any>();
  const [searchText, setSearchText] = useState("hyunwoo");

  const {state : { isLoggedIn }} = useContext(Context);

  useEffect(() => {
    if (data) {
      setAlbumList(data!.allAlbums!);
      // console.log(meData.me!.username);
    }
  }, [data, loading]);

  return (
    <>
      <Menu>
        <Link to={{ pathname: "/login" }}>login</Link>
      </Menu>
      { isLoggedIn && <div>{isLoggedIn}</div> }
      {albumList && (
        <MainContainer>
          <MainHeader>
            <h1>Album</h1>
          </MainHeader>
          <MainBody>
            <AlbumListWrapper>
              {albumList.map((album) => {
                return (
                  <AlbumWrapper key={album?.name}>
                    <h2>{album!.name}</h2>
                  </AlbumWrapper>
                );
              })}
            </AlbumListWrapper>
            {/* {me && (
              <CreateButton>
                <Link to="/CreateRoom">
                  <h2>Create Room</h2>
                </Link>
              </CreateButton>
            )} */}
          </MainBody>
        </MainContainer>
      )}
    </>
  );
};

export default Main;
