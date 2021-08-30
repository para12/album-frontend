import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GetAlbumPhotosDocument,
  useAddPhotoMutation,
  useGetPresignedUrlLazyQuery,
} from "../../graphql/graphql";
import { uploadPhoto } from "../../util/uploadPhoto";
import { getPhotoData } from "../../util/getPhotoData";
import { readPhoto } from "../../util/readPhoto";
import { makeTimeStampName } from "../../util/makeUrlandPhotoname";

type StateType = {
  album: {id: string, name: string, owner : { username : string} };
};

const AddPhoto = () => {
  const history = useHistory();
  const state = history.location.state as StateType;
  const {
    state: { loginUser },
  } = useContext(Context);

  const [text, setText] = useState<string>("");
  const [loc, setLoc] = useState<string>("");
  const [time, setTime] = useState<Date | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>();
  const [filename, setFilename] = useState<string>("");
  const [showImg, setShowImg] = useState<
    string | ArrayBuffer | null | undefined
  >();

  const [getUrl, { loading, data }] = useGetPresignedUrlLazyQuery({
    variables: { filename },
  });
  const [addPhoto] = useAddPhotoMutation();

  const auth =
    loginUser &&
    state &&
    state.album.owner.username &&
    loginUser === state.album.owner.username;

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
        state: { album: state.album },
      });
    })();
  }
  return (
    <>
      {auth && (
        <>
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
          </div>

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

          {file && (
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
                    albumId: state!.album.id,
                  },
                  refetchQueries: [
                    {
                      query: GetAlbumPhotosDocument,
                      variables: { albumId: state!.album.id },
                    },
                  ],
                });
                getUrl();
              }}
            >
              add
            </button>
          )}
          {!file && <button disabled> add </button>}
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

export default AddPhoto;
