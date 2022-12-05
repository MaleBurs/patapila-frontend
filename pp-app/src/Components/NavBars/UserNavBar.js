
import { Popover } from '@headlessui/react'
import AuthService from "../../services/auth.service";
import "../../Fonts/Poppins-Bold.ttf"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import "./navBar.css"
import "../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Buttons from "../Utiles/Butttons";
import LogoPataPila_Colores from "../Images/LogoPataPila_Colores.jpg";
import avatar from "../Images/avatar.jpeg";
import ImageService from '../../services/images.service';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import InformationTooltips from '../Utiles/InformationDisplayTooltip';
import PaymentManagerService from '../../services/paymentManager.service';

export default function UserNavBar(props) {
  const [imgSrc, setImgSrc] = useState(avatar);
  const [hasNotificationBeenSeen, setHasNotificationBeenSeen] = useState(false);
  const navigate = useNavigate();
  const userName = props.currentUser.name;
  const userLastName = props.currentUser.lastname;
  const [notifications, setNotifications] = useState([]);

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    ImageService.getImageUrl().then((url) => {
      setImgSrc(url);
    }).catch();
  }, []);

  useEffect(() => {    
    PaymentManagerService.getNotifications().then((response) => {
      setNotifications(response.data);
    }).catch();
  }, []);

  useEffect(() => {
    if(notifications.length > 0 || notifications.filter((notification) => notification.reed === "NR").length > 0){
      setHasNotificationBeenSeen(true);
    }
  }, [notifications])
  

  const setAllNotificationsAsRead = () => {
    notifications.forEach((notification) => {
      PaymentManagerService.readNotifications(notification.id).then().catch();
    });
  }

  const deleteNotification = (notification ) => {
    PaymentManagerService.deleteNotification(notification.id).then().catch();
    navigate("/gestorDeCobrosSuscripciones");
  }

  return (
    <>
        <nav className="bg-transparent container sm:h-10 fix mx-auto top-0 left-0" aria-label="Global">
          <div className="mt-6 mx-auto flex flex-row justify-around md:mx-8">
              <div className="flex flex-row justify-between w-full mx-3 lg:mx-0 lg:basis-5/7">
                  <div className='mt-3'>
                    <a href="https://patapila.org/index.php">
                    <img
                        className="h-auto w-[160px]"
                        alt="LogoPataPila_Colores"
                        src={LogoPataPila_Colores}
                    />
                    </a>
                </div>
            </div>
          <div className="mt-6 z-50 w-full flex flex-row justify-end space-x-4 ">
          <div className='grid'> 
          {props.activateAdminNotifications && 
            <Popover className={"grid"}>
            <Popover.Button className="flex flex-row justify-self-end justify-center lightgreyBgTranslucentHover rounded-3xl md:rounded-xl w-fit py-2 px-2">
                <button onClick={()=>setAllNotificationsAsRead()}><FontAwesomeIcon icon={faBell} color="gray" className='' /></button>
                {
                  notifications.length > 0 && hasNotificationBeenSeen &&
                  <InformationTooltips.Alert size="h-2 w-2 -mt-4"/>
                }
            </Popover.Button>
            <Popover.Panel className={"z-70 fixed mt-12 p-2 w-fit justify-self-end rounded-2xl reallyLightgreyBg grayBorder space-y-2"}>
              <div className="md-round space-y-2">  
              {notifications.length > 0 ?
              notifications.slice(-3).map((item) => (
                <button key={item.title} onClick={()=>deleteNotification(item)} className="w-full space-y-1 text-left z-50 relative font-Pop-M darkGrayText grayBottomBorder block px-1 py-2 duration-300">
                  <div className={`font-Pop-M text-sm tracking-[0.3px] ${item.read==="NR" && 'yellowText'}`}>{item.title}</div>
                  <div className='font-Pop-L text-xs'>{item.description}</div>
                </button>
                ))
              :
                <div className='w-full space-y-1 text-left z-50 relative text-gray-400 block px-1 py-2 duration-300]'>
                  <div className='font-Pop-B text-sm'>No tiene notificaciones</div>
                </div>
              }
              </div>
            </Popover.Panel>
            </Popover>
          }
          </div>
            <Popover className={"grid"}>
            <Popover.Button className="justify-self-end lightgreyBgTranslucentHover rounded-3xl md:rounded-xl w-fit py-2 px-5">
            <div className="justify-center  flex z-50 space-x-4 overflow-hidden mx-auto lg:flex-row">
                <img className="h-6 w-6 rounded-full" src={imgSrc} alt="avatar"></img>
                <div className='mt-1 hidden md:flex lg:flex font-Pop-SB uppercase blackText duration-[0.3s] tracking-[1px] text-sm'>
                  {userName} {userLastName}
                </div>
                <div className="">
                  <FontAwesomeIcon icon="fa-solid fa-angle-down" className="arrow-down-icon pt-1" />
                </div>
            </div>
            </Popover.Button>
            <Popover.Panel className={"z-70 fixed mt-12 p-2 w-fit justify-self-end rounded-2xl reallyLightgreyBg grayBorder space-y-2"}>
              <div className="md-round space-y-2">  
              {props.navigation.map((item) => (
                <button key={item.name} onClick={()=>navigate(item.path)} className='w-full text-left z-50 relative font-Pop-M text-sm uppercase darkGrayText font-medium tracking-[0.5px] grayBottomBorder block px-1 py-2 text-[10pt] duration-300 hover:text-[11pt] focus:text-[11pt]'>
                  {item.name}
                </button>
                ))}
              </div>
              <Buttons.ProfileNavBarButton onClick={logOut} text={"Cerrar Sesión"}/> 
            </Popover.Panel>
            </Popover>
            </div>
        </div>
      </nav>
      </>
  )
}