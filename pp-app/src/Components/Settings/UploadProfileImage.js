import React, { useState, useEffect } from "react";
import "../../App.css"
import { useCurrentAdmin } from "../../Context/CurrentAdminContext";

const UploadProfileImage = (props) => {
  const { profilePicture } = useCurrentAdmin();
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    profilePicture!=="null"? setImgSrc(profilePicture): setImgSrc(null);
  }, [profilePicture]);

  const fileChanged = (event) => {
    /*Debería de poner el cosito de Loading */
    props.setFile(event.target.files[0])
    setImgSrc(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <>
      <div className="p-7 flex flex-col space-y-2">
        <div className="tracking-widest font-Pop-R text-xs uppercase blackText ">Foto de Perfil</div>
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
              accept="image/png, image/jpeg, image/jpg"
              onChange={fileChanged} className="hidden"
              id="dropzone-file"></input>
          </div>
          </label> 
        </div>
        
      </div>
    </>
  );
};
export default UploadProfileImage;