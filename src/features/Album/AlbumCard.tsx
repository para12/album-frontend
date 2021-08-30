import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import {
  GetUserAlbumsDocument,
  useDeleteAlbumMutation,
  AlbumType
} from "../../graphql/graphql";

const AlbumWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border: grey 1px dashed;
`;

const MenuIcon = styled.div`
  width: 50px;
  height: 20px;
  padding: 3px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  padding: 3px auto;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid green;
`;

const MenuWrapper = styled.div`
  top: 0;
  right: 0;
  position: absolute;
`;

type AlbumCardProp = {
  album : AlbumType | {owner : {username : string}, id : string, name: string};
  loginUser : string | boolean | null | undefined;
  albumListQueryVariable: string;
};

const AlbumCard = ({
  album,
  loginUser,
  albumListQueryVariable,
}: AlbumCardProp) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteAlbum] = useDeleteAlbumMutation();
  const history = useHistory();
  return (
    <>
      <AlbumWrapper>
        {loginUser === album?.owner.username && (
          <MenuWrapper>
            {!isMenuOpen && (
              <MenuIcon onClick={() => setIsMenuOpen(true)}> ... </MenuIcon>
            )}
            {isMenuOpen && (
              <Menu>
                <MenuItem
                  onClick={async () => {
                    let del = window.confirm("really?");
                    if (del) {
                      await deleteAlbum({
                        variables: { id: album.id },
                        refetchQueries: [
                          {
                            query: GetUserAlbumsDocument,
                            variables: { username: albumListQueryVariable },
                          },
                        ],
                      });
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  delete
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push({ pathname: "/ModifyAlbum", state: { album } });
                  }}
                >
                  modify
                </MenuItem>
              </Menu>
            )}
          </MenuWrapper>
        )}

        <Link to={{ pathname: "/album", state: { album } }}>
          <h2>{album.name}</h2>
        </Link>
      </AlbumWrapper>
    </>
  );
};

export default AlbumCard;
