import "../NavBars/navBar.css"
import "../../App.css"
import Buttons from "./Butttons"

const Modal = (props) =>{
    function closeModal(event) {
        props.onChange(event.target.userWantsToRegister);
    }
    return(
        <>
          <div
            className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-10">
              {/*content*/}
              <div className="  space-y-9 p-12 rounded-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="font-Pop-SB text-base tracking-[0px] blackText">
                    {props.header}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                  <p className="leading-relaxed font-Pop-R text-sm text-medium tracking-[0.2px] blackText">
                   {props.body}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end">
                  <Buttons.SolidGreenButton text={props.buttonText} color={"greenBg"} margins={"mr-1 mb-1"} onClick={closeModal}/>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Modal;