import axios from "axios";
import imageCompression from "browser-image-compression";


export const uploadPhoto = async (presignedUrlString: string, file : File) => {
  
  let presignedUrl = JSON.parse(presignedUrlString);
  const formData = new FormData();

  Object.keys(presignedUrl.fields).forEach((key) => {
    formData.append(key, presignedUrl.fields[key]);
  });

  const img_compressed = await imageCompression(file, {
    maxWidthOrHeight: 1920,
    // useWebWorker: true
  });
  formData.append("file", img_compressed);

  await axios.post(presignedUrl.url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
