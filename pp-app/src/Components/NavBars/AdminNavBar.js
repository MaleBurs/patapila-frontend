import "../../Fonts/Poppins-Bold.ttf"
import "./navBar.css"
import "../../App.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../../services/auth.service";
import fontawesome from '@fortawesome/fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import { SideBar } from "./SideBar"
import { TopBar } from "./TopBar"
fontawesome.library.add(faBars);

export default function AdminNavBar() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <> 
    {TopBar(setShowSideBar, setToggleDropdown)}
    {SideBar(showSideBar, setShowSideBar, navigate, setToggleDropdown, toggleDropdown, logOut)}
    </>
  )};

