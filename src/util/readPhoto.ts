
export const readPhoto = (image : File, setShow : any) =>{
    
    const reader = new FileReader();
    reader.onloadend = (e) => {
        setShow(e.target!.result);
    };
    reader.readAsDataURL(image!);
    
}
