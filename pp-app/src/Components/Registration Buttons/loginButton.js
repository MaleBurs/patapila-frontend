import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = ({ style }) => {
  const { loginWithRedirect } = useAuth0();

  return <button className= {style} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;