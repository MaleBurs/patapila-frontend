import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom"

const BoardUser = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  const logOut = () => {
    AuthService.logout();

    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <button onClick={logOut}>Cerrar Sesión</button>
      </header>
    </div>
  );
};
export default BoardUser;