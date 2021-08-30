import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  GetAlbumPhotosDocument,
  PhotoType,
  useDeletePhotoMutation,
} from "../../graphql/graphql";
import { makeUrlfromPhotoname } from "../../util/makeUrlandPhotoname";

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

type PhotoCardProp = {
  photo: PhotoType | any;
  loginUser: string;
  albumId : string;
};

const PhotoCard = ({ loginUser, photo, albumId }: PhotoCardProp) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deletePhoto] = useDeletePhotoMutation();
  const history = useHistory();
  return (
    <>
      <AlbumWrapper>
        {loginUser === photo.owner.username && (
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
                      await deletePhoto({
                        variables: { id: photo.id },
                        refetchQueries: [
                          {
                            query: GetAlbumPhotosDocument,
                            variables: { albumId },
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
                    history.push({
                      pathname: "/ModifyPhoto",
                      state: { photo },
                    });
                  }}
                >
                  modify
                </MenuItem>
              </Menu>
            )}
          </MenuWrapper>
        )}

        <div>
          <p>
            {photo.location} {photo.text} {photo.time}
          </p>
          <img
            height={400}
            src={makeUrlfromPhotoname(photo.url)}
            alt={photo.location}
          />
        </div>
        {/* <Link to={{ pathname: "/photo", state: { albumId : id } }}>
        </Link> */}
      </AlbumWrapper>
    </>
  );
};

export default PhotoCard;
