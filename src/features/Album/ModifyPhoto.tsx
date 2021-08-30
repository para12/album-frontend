import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GetAlbumPhotosDocument,
  useAddPhotoMutation,
  useDeletePhotoMutation,
  useGetPresignedUrlLazyQuery,
  useModifyPhotoMutation,
} from "../../graphql/graphql";
import { uploadPhoto } from "../../util/uploadPhoto";
import { getPhotoData } from "../../util/getPhotoData";
import { readPhoto } from "../../util/readPhoto";
import {
  makeTimeStampName,
  makeUrlfromPhotoname,
} from "../../util/makeUrlandPhotoname";

type StateType = {
  photo: {
    text: string;
    location: string;
    time: string | null;
    width: number | null;
    height: number | null;
    url: string;
    id: string;
    owner: {
      username: string;
    };
    album: { id: string; name: string; owner: { username: string } };
  };
};

const ModifyPhoto = () => {
  const history = useHistory();
  const state = history.location.state as StateType;
  const {
    state: { loginUser },
  } = useContext(Context);

  const [text, setText] = useState(state.photo.text);
  const [loc, setLoc] = useState(state.photo.location);
  const [time, setTime] = useState<Date | null>(
    state.photo.time ? new Date(state.photo.time) : null
  );
  const [width, setWidth] = useState<number | null>(state.photo.width);
  const [height, setHeight] = useState<number | null>(state.photo.height);
  const [file, setFile] = useState<File | null>();
  const [filename, setFilename] = useState<string>(state.photo.url);
  const [showImg, setShowImg] = useState<
    string | ArrayBuffer | null | undefined
  >();
  const [isFileChange, setIsFileChange] = useState(false);

  const [getUrl, { loading, data }] = useGetPresignedUrlLazyQuery({
    variables: { filename },
  });
  const [addPhoto] = useAddPhotoMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [modifyPhoto] = useModifyPhotoMutation();

  const auth =
    loginUser &&
    state &&
    state.photo.owner.username &&
    loginUser === state.photo.owner.username;

  useEffect(() => {
    if (!auth) {
      alert("login needed");
      history.push("/");
    }
  });

  if (!loading && data && file) {
    (async () => {
      await uploadPhoto(data.presignedUrl!, file);
      history.push({
        pathname: "/album",
        state: { album: state.photo.album },
      });
    })();
  }
  return (
    <>
      {auth && (
        <>
          {isFileChange && (
            <div>
              <input
                type="file"
                onChange={async (e) => {
                  let file = e.target?.files ? e.target.files[0] : null;
                  await readPhoto(file!, setShowImg);
                  const {
                    time: extracted_time,
                    width: extracted_width,
                    height: extracted_height,
                  } = await getPhotoData(file!);
                  setHeight(extracted_height);
                  setWidth(extracted_width);
                  setTime(extracted_time);
                  setFile(file);
                  setFilename(makeTimeStampName(file!.name));
                }}
              />
              {showImg && <img src={showImg as string} height={200} alt="" />}
              <button
                onClick={() => {
                  setIsFileChange(false);
                  setFile(null);
                }}
              >
                use old one
              </button>
            </div>
          )}
          {!isFileChange && (
            <div>
              <img
                src={makeUrlfromPhotoname(state.photo.url)}
                height={200}
                alt=""
              />
              <button onClick={() => setIsFileChange(true)}>
                photo change
              </button>
            </div>
          )}

          <div>
            <p>location</p>
            <input onChange={(e) => setLoc(e.target.value)} value={loc} />
          </div>
          <div>
            <p>time</p>
            <DatePicker
              selected={time}
              onChange={(date: Date) => setTime(date)}
            />
          </div>
          <div>
            <p>text</p>
            <textarea onChange={(e) => setText(e.target.value)} value={text} />
          </div>

          {isFileChange && file && (
            <button
              onClick={async () => {
                // let url = makeUrlfromPhotoname(filename);
                await addPhoto({
                  variables: {
                    url: filename,
                    location: loc,
                    text,
                    time: time?.toISOString().substring(0, 10), //for matching to the type date of Graphene, Backend
                    width,
                    height,
                    albumId: state!.photo.album.id,
                  },
                  refetchQueries: [
                    {
                      query: GetAlbumPhotosDocument,
                      variables: { albumId: state!.photo.album.id },
                    },
                  ],
                });
                await deletePhoto({
                  variables: { id: state.photo.id },
                  refetchQueries: [
                    {
                      query: GetAlbumPhotosDocument,
                      variables: { albumId: state!.photo.album.id },
                    },
                  ],
                });
                getUrl();
              }}
            >
              modify
            </button>
          )}
          {isFileChange && !file && <button disabled> modify </button>}
          {!isFileChange && (
            <button
              onClick={async () => {
                // let url = makeUrlfromPhotoname(filename);
                await modifyPhoto({
                  variables: {
                    id: state.photo.id,
                    location: loc,
                    text,
                    time: time!.toISOString().substring(0, 10), //for matching to the type date of Graphene, Backend
                  },
                  refetchQueries: [
                    {
                      query: GetAlbumPhotosDocument,
                      variables: { albumId: state!.photo.album.id },
                    },
                  ],
                });
                history.push({
                  pathname: "/album",
                  state: { album: state.photo.album },
                });
              }}
            >
              modify
            </button>
          )}
        </>
      )}
      {!auth && (
        <>
          <p>back to main..</p>
        </>
      )}
    </>
  );
};

export default ModifyPhoto;
