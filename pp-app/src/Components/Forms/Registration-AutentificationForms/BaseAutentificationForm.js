import React, { useState, useRef } from "react";
import "../../../App.css";
import SeparationLine from '../../Utiles/SeparationLine';
import Buttons from '../../Utiles/Butttons';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from "../Messages";

export default function BaseAutetificationForm(props) {
  const form = useRef();
  const checkBtn = useRef();
  const [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const changeLoadingState = () => {
    setIsLoading(!isLoading);
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const handleClick = async event => {
    console.log("empezo la espera");
    await delay(5000);
    console.log("termino la espera");
  };

  const startSubmition = (e) => {
    handleClick();
    e.preventDefault();
    setMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      changeLoadingState();
      props.submitFunction({setMessage});
      changeLoadingState();
    }
  }

  return (
    <>
      <div className="md:items-center mb-10 justify-items-center grid px-4 sm:px-6 lg:px-8 lg:justify-items-end">
        <div className={`${props.extraStyles} grid content-center h-fit w-full rounded-3xl space-y-4 bg-white bg-opacity-90 lg:mx-16 drop-shadow-2xl p-8 md:px-12 md:py-6`}>
          <div className="">
              <img
              className="mx-auto h-32 w-auto"
              src={props.logo}
              alt="LogoForm"
              />
          </div>

          <Form className="" onSubmit={startSubmition} ref={form}>

            <div className="space-y-3 rounded-md">       
            {props.inputs.map((input) => {
              return (
                <>
                <div className= "relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-xl border border-gray-300 px-2 focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
                <Input
                  type={(input.type==="password" && !passwordShown)? "password" : "text"}
                  className="bg-transparent block w-full border-transparent py-2 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-R text-xs focus:outline-none"
                  name={input.name}
                  value={input.value}
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                  validations={input.validations}
                />
                {input.type === "password" &&(
                  <span className="pt-1 px-2"><FontAwesomeIcon onClick={togglePassword} icon={passwordShown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size={"xs"} /></span>
                )}
                </div>
                </>
              );})} 
            </div>
    
            <Buttons.SolidGreenButton text={props.textOnButton} loading={isLoading} color={"greenBg"} margins={"my-4 md:my-6"} onClick={null} ref={checkBtn}/> 

            {(props.textBeforeSeparationLine) ?
            <div className="grid justify-items-center">
                <button className="yellowTextHover purpleText font-Pop-SB text-xs" onClick={props.functionBeforeSeparationLine}>
                  {props.textBeforeSeparationLine}
                </button>
            </div>
            :<></>} 

            <SeparationLine text={"O"} margins="mt-3"/>
            <div className="flex flex-rows justify-center mt-3 mb-4">
                <div className="gray-300 font-Pop-R text-sm">
                  {props.textAfterSeparationLine}
                </div>
                <button className="ml-3 greenText yellowTextHover font-Pop-SB text-sm" onClick={props.functionAfterSeparationLine}>
                  {props.actionAfterSeparationLine}
                </button>
            </div> 

            {message && (
            <Messages.ErrorMessage message={message}/>
            )}
            
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  );
};