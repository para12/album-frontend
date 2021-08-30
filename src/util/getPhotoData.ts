import exifr from "exifr";

export const getPhotoData = async (image : File) =>{
    const photo = await exifr.parse(image);
    const time = photo.DateTimeOriginal
    ? photo.DateTimeOriginal
    : photo.ModifyDate;
    const isRotated =
    photo.Orientation.includes("Rotate 90") ||
    photo.Orientation.includes("Rotate 270");
    const width = !isRotated ? photo.ExifImageWidth : photo.ExifImageHeight;
    const height = !isRotated ? photo.ExifImageHeight : photo.ExifImageWidth;
    return { time, width, height}
}
