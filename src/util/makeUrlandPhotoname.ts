export const makeTimeStampName = (name : string) => {
    return String(new Date().getTime()) + "_" + name
}
export const makeUrlfromPhotoname = (name : string) =>{
    // return "https://photoalbum.imgix.net/"+ name ;
    // return "https://res.cloudinary.com/demo/image/fetch/w_1200/https://ourphotoalbum.s3.ap-northeast-2.amazonaws.com/"+ name ;
    // return "https://res.cloudinary.com/dnkvykbeq/image/fetch/w_900/https://ourphotoalbum.s3.ap-northeast-2.amazonaws.com/"+ name ;
    return "https://ik.imagekit.io/1qoijmbaoax/tr:h-600/"+ name ;
}

