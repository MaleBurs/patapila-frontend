import "../../NavBars/navBar.css"
import "../../../App.css"

const ModalWithConfirmation= (props) =>{

    function closeModal(event) {
        props.onChange(event.target.userWantsToRegister);
    }
    function saveChangesFromModal(event) {
      props.saveChanges(event);
      closeModal(event);
    }

    return(
        <>
          <div
            className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-16 h-fit">
              
              <div className=" space-y-5 p-12 w-fit rounded-lg flex flex-col bg-white outline-none focus:outline-none">
                
                <div className="px-5 font-Pop-R text-base purpleText tracking-widest text-center">
                    {props.title}
                </div>
               
                <div className="relative flex flex-col space-y-4">
                    <div className="normal-case font-Pop-R flex flex-wrap space-x-1 leading-relaxed font-Pop-R text-sm tracking-[0.2px] purpleText">
                      {props.content}
                    </div>
                  <p className="text-center font-Pop-R text-sm text-gray-400">
                   {props.body}
                  </p>
                </div>
                <div className="flex items-center flex-rows justify-between">
                <button onClick={closeModal} className="mx-3 py-3 h-fit px-7 greyBg rounded-xl tracking-widest font-Pop-M uppercase font-medium text-gray-500 duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white text-xs">{props.cancelButton}</button>
                <button onClick={saveChangesFromModal} text="Guardar Cambios" className="mx-3 py-3 h-fit px-7 bg-[#0F6938] text-white rounded-xl tracking-widest font-Pop-M uppercase font-medium duration-700 hover:bg-[#6c3333] focus:bg-[#6c3333]  text-xs">{props.saveButton}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ModalWithConfirmation;