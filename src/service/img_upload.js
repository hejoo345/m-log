class ImgUpload{

    async upload(file){
        const url = "https://api.cloudinary.com/v1_1/dam1bvuv9/image/upload";
        const formData = new FormData();

        formData.append('file',file);
        formData.append('upload_preset','zcj8e5as');

        const result = await fetch(url,
            {
            method: "POST",
            body: formData
          });
        return await result.json();
    }
}

export default ImgUpload;