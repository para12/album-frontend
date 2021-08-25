import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import {
  GetUserAlbumsDocument,
  useDeleteAlbumMutation,
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
  name: string;
  id: string;
  isMenu: boolean;
  albumListQueryVariable: string;
};

const AlbumCard = ({
  name,
  id,
  isMenu,
  albumListQueryVariable,
}: AlbumCardProp) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteAlbum] = useDeleteAlbumMutation();
  const history = useHistory();
  return (
    <>
      <AlbumWrapper>
        {isMenu && (
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
                        variables: { id },
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
                    history.push({ pathname: "/ModifyAlbum", state: { id, name } });
                  }}
                >
                  modify
                </MenuItem>
              </Menu>
            )}
          </MenuWrapper>
        )}

        <Link to={{ pathname: "/album", state: { id } }}>
          <h2>{name}</h2>
        </Link>
      </AlbumWrapper>
    </>
  );
};

export default AlbumCard;
