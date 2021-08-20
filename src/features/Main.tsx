import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGetAllAlbumsQuery, useMeQuery } from "../graphql/graphql";


interface AlbumType {
  name : string;
  createdAt : string;
}
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: fixed;
  left: 0;
  top: 0;
`;

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

const RoomListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
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
  const [roomList, setRoomList] = useState<Array<AlbumType | null>>();
  // const [me, setMe] = useState<any>();

  useEffect(() => {
    if (data) {
      setRoomList(data!.allAlbums!);
      // console.log(meData.me!.username);
    }
  }, [data, loading]);

  return (
    <>
      {roomList && (
        <MainContainer>
          <MainHeader>
            <h1>Album</h1>
          </MainHeader>
          <MainBody>
            <RoomListWrapper>
              {roomList.map((room) => {
                return (
                  <div>{room!.name}</div>
                );
              })}
            </RoomListWrapper>
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
