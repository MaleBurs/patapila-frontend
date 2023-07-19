import React, { useState, useEffect } from "react";
import "../../App.css"
import ImageService from "../../services/images.service";
import { useCurrentUser } from "../../Context/CurrentUserContext";
import AuthService from "../../services/auth.service"

const UploadProfileImage = (props) => {
  const [file, setFile] = useState(null);
  const { profilePictureURL } = useCurrentUser();
  const [imgSrc, setImgSrc] = useState(null);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    setImgSrc(profilePictureURL);
  }, [profilePictureURL]);

  const fileChanged = (event) => {
    setFile(event.target.files[0])
    setImgSrc(URL.createObjectURL(event.target.files[0]))
  }

  const upload = async (event) => {
    //ImageService.upload(file).then(res =>{window.location.reload()})
    //window.location.reload()
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", currentUser.id);
    console.log(formData)
    fetch("http://localhost:8080/api/images/upload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <>
      <div className="p-7 flex flex-row space-x-6">
        <div>
          <label className="">
          <div className={`w-20 h-20 rounded-xl text-2xl md:text-3xl font-Pop-M greenText duration-3 hover:bg-gray-100 focus:bg-gray-100 ${imgSrc ? "":"p-4 px-6 md:p-5 md:px-8 grayDottedBorder lighterGreyBg "}`}>
            {imgSrc ?
              <img src={imgSrc} alt="" className="object-cover rounded-xl w-20 h-20"/>
              :
              <span>+</span>}
            <input 
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={fileChanged} className="hidden"
              id="dropzone-file"></input>
          </div>
          </label> 
        </div>
        <div className="space-y-2 md:space-y-3">
          <div className="tracking-wide font-Pop-M font-medium text-sm uppercase blackText">Foto de Perfil</div>
          <div className="py-3 px-6 md:px-8 lg:px-10 greyBg rounded-xl tracking-widest font-Pop-M uppercase text-gray-500 hover:text-white focus:text-white text-xs md:text-sm duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white" onClick={upload}>Guardar Cambios</div>
        </div>
      </div>
    </>
  );
};
export default UploadProfileImage;