import React, { useState, useRef, useEffect } from "react";
import "../../../App.css";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Messages from "../Messages";
import Loading from "../../Utiles/Loading";


const InformationColumn = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [loadingState, setLoadingState] = useState(props.loading);

  const startSubmition = (e) => {
    e.preventDefault();
    props.onChangeMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      props.submitFunction();
    }
  }

  useEffect(() => {
    setLoadingState(props.loading);
  }, [props.loading]);

  return (
    <>
    <div className="px-7 pb-7 ">
      <Form className="" onSubmit={startSubmition} ref={form}>
      <div className="flex flex-col">
        { props.information.map((data) => {
            return (
              <div key={data.title} className="flex flex-col space-y-2 mb-5">
                <div className="tracking-widest font-Pop-R text-xs uppercase blackText">{data.title}</div>
                <div className= "relative flex flex-row justify-between bg-transparent block w-full rounded-md border border-[#e7e6e6] focus:z-10 focus:outline-none greenBorderWhenFocus form-control divide-x divide-[#e7e6e6]">
                  { data.content.map((input) => {
                    return(
                      React.createElement(input.component, {
                        name: input.name,
                        value: input.value,
                        onChange: input.onChange,
                        validations: input.validations,
                      })
                    )
                  })}
                </div>
              </div>
            )
        })}
        
        {props.message && (
          <Messages.ErrorMessage message={props.message}/>
        )}
        
        <div className="self-end">
          <button
            className="mt-3 flex flex-row space-x-3 items-center w-fit font-Pop-M purpleBgHover uppercase tracking-widest text-sm py-3 rounded-md px-4 bg-[#6c3333] text-white"
            ref={checkBtn} onClick={null}
          >
           <div>Guardar Cambios</div>
            {loadingState ? <Loading/> : null}
          </button >
        </div> 
        <CheckButton style={{ display: "none" }} ref={checkBtn} />

      </div>
      </Form> 
    </div>
    </>
  );
};
export default InformationColumn;