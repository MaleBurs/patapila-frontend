import { useAmount } from '../../../../Context/AmountContext';
import Buttons from '../../../Utiles/Butttons'
import { useEffect } from 'react'
import DonationService from '../../../../services/donations.service'
import AuthService from '../../../../services/auth.service'
import ActServices from '../../../../services/activities.service'
import AdminServices from '../../../../services/transactions.service'
import { useNavigate } from "react-router-dom"

const DonationResult = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const {payedAmount, setPayedAmount} = useAmount();
  const queryParameters = new URLSearchParams(window.location.search)
  const status = queryParameters.get('status');
  const preference_id = queryParameters.get('preference_id');

  const newOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Tu donación de única vez ha sido realizada con éxito!", description: "Has realizado una donación de $"+amount+"."}
  }

  const rejectedOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Tu donación de única vez ha sido rechazada!", description: "Tu donación de $"+amount+" fue rechazada."}
  }

  const pendingOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Tu donación de única vez esta pendiente!", description: "Has realizado una donación de $"+amount+" que se encuentra pendiente de ser cobrada."}
  }

  useEffect(() => {
    console.log("managePayment"+payedAmount);
    managePayment();
  },[payedAmount]);

  const continueIfSuccess = () => {
    navigate("/inicio");
    window.location.reload();
  };

  const continueIfFailure = () => {
    navigate("/donar");
    window.location.reload();
  };


  const managePayment = () => {
    if(status !=undefined){
      if(status == "approved"){
        if(payedAmount ==0){
          DonationService.getPreference(preference_id).then(
          (res) => {
            console.log(res);
            setPayedAmount(res.data.response.items[0].unit_price);
            ActServices.createActivity(newOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).title, newOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).description, currentUser.id). then(
              (res)=> {console.log(res)})
         },
          (error) => {
            console.log(error);
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);
          })
          AdminServices.modifyTransactionStateByPreference(preference_id, "A").then((res)=>console.log(res))
      }
      }else if(status == "rejected"){
        if(payedAmount == 0){
          DonationService.getPreference(preference_id).then(
          (res) => {
            console.log(res)
            setPayedAmount(res.data.response.items[0].unit_price);
            ActServices.createActivity(rejectedOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).title, rejectedOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).description, currentUser.id). then(
              (res)=> console.log(res)
            )
          },
          (error) => {
            console.log(error);
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);
          })
          AdminServices.modifyTransactionStateByPreference(preference_id, "R").then((res)=>console.log(res))
      }}
    }
  }

  return (
    <>
              {/*content*/}
                {(payedAmount!=0)?
                <>
                <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl"></div>
                <div className="  space-y-9 p-12 rounded-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="font-Pop-SB text-[20pt] tracking-[0px] blackText">
                    {(status == "approved")? "El pago de tu donación de única vez ha sido realizado con éxito!":"El pago de tu donación de única vez ha sido rechazado!"}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex flex-col space-y-10">
                    <div className="font-Pop-M flex flex-wrap space-x-1 leading-relaxed font-Pop-R text-[15pt] text-medium tracking-[0.2px] purpleText">
                      <p>{(status == "approved")? "Se aprobó el pago de una donación de ":"Se rechazó el pago de una donación de "}</p>
                      <p className="underline decoration-[#eb8301] decoration-wavy underline-offset-4">${payedAmount}</p>
                      <p>.</p>
                    </div>
                  <p className="text-center font-Pop-R text-lg text-gray-400">{(status == "approved")?"Muchas gracias por realizar una donación para brindar atención nutricional a niños/as de la comunidad.":"Prueba realizar una donación con otro monto para brindar atención nutricional a niños/as de la comunidad."}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end">
                  <Buttons.SolidGreenButton text="Continuar" color={"yellowBg"} margins={"mr-1 mb-1"} onClick={()=> {(status =="approved")?continueIfSuccess(): continueIfFailure()}}/>
                </div>
                </div>
                </div>
                </>
                :<>
                {/* <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-white-300 border-8 h-56 w-56"></div>
                </div> */}
                </>}
          <div className="fixed inset-0 z-40"></div>
        </>
  )
}

export default DonationResult;
