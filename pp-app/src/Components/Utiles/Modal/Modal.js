import "../../NavBars/navBar.css"
import "../../../App.css"

const Modal = (props) =>{
    function closeModal(event) {
        props.onChange(event.target.userWantsToRegister);
    }
    return(
        <>
          <div
            className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-2xl p-10">
              {/*content*/}
              <div className="space-y-5 p-12 rounded-md relative flex flex-col w-fit bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="font-Pop-M text-lg tracking-widest purpleText">
                    {props.header}
                </div>
                {/*body*/}
                <div className="leading-relaxed font-Pop-L text-sm tracking-wider text-gray-700">
                  {props.body}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end">
                  <button onClick={closeModal} className="mt-5 font-Pop-R tracking-widest text-sm text-white greenBg duration-1000 hover:bg-[#6c3333] uppercase py-3 px-4 rounded-md">{props.buttonText}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Modal;