import { useSelectionOnTable } from "../../Context/SelectionsOnTable"
import { useEffect, useState } from "react";

const Sidebar = ({displaySubscriptionInformation}) => {
  const {showSidebar, setShowSidebar, setSelectedUser, selectedUserInfotmation, selectedUserSubs, selectedUserPersonalInfo} = useSelectionOnTable();
  const [userData, setUserData] = useState([{}])
  const [userPersonalData , setUserPersonalData] = useState([{}])
  const [subscriptionData, setSubscriptionData] = useState([{}])
  const formatoParaLaFecha = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
  };
  const formatoFecha = new Intl.DateTimeFormat('es', formatoParaLaFecha);
  
  const closeSidebar= () => {
    setShowSidebar(false);
      setSelectedUser(null);
  }

  useEffect(() => {
    if (selectedUserInfotmation) setUserData([{title: "Nombre y Apellido", information: selectedUserInfotmation.name+' '+selectedUserInfotmation.lastname},{title: "Se unió a la comunidad el", information:  formatoFecha.format(new Date(selectedUserInfotmation.createdAt))}, {title: "Id del usuario", information: selectedUserInfotmation.id},{title:"Email", information:selectedUserInfotmation.email}]);
    if(selectedUserPersonalInfo) setUserPersonalData(
      [{title: "País", information: (selectedUserPersonalInfo.country==="") ? "-": selectedUserPersonalInfo.country},
      {title: "Ciudad", information: (selectedUserPersonalInfo.city==="" ) ? "-": selectedUserPersonalInfo.city}, 
      {title: "Fecha de Nacimiento", information: (selectedUserPersonalInfo.dateOfBirth===null) ? "-":   formatoFecha.format(new Date(selectedUserPersonalInfo.dateOfBirth))},
      {title: "Celular", information:(selectedUserPersonalInfo.phoneNumber==="") ? "-": selectedUserPersonalInfo.phoneNumber}])

    if (displaySubscriptionInformation && selectedUserSubs){  
    setSubscriptionData([
      {title: "Id de la suscripción", information: selectedUserSubs.id}, 
      {title: "Monto", information: selectedUserSubs.amount},
      {title: "Frecuencia", information: (selectedUserSubs.frequency === 1) 
                                          ? "1 vez al mes":
                                        ((selectedUserSubs.frequency === 2) 
                                          ? "1 vez cada 3 meses"
                                          :((selectedUserSubs.frequency === 3)
                                          ? "1 vez cada 6 meses"
                                          :((selectedUserSubs.frequency === 4)
                                          ? "1 vez cada 1 año"
                                          :"")))},
      {title: "Estado", information: (selectedUserSubs.subscriptionState.state === "A") 
                                          ? "Activa":
                                         ((selectedUserSubs.subscriptionState.state === "P") 
                                          ? "Pausada"
                                          :((selectedUserSubs.subscriptionState.state === "C")
                                          ? "Cancelada"
                                          :""))},
      {title:"Fecha del próximo pago", information:(selectedUserSubs.nextPaymentDate === null) ? "-":  formatoFecha.format(new Date(selectedUserSubs.nextPaymentDate))}, 
      {title:"Fecha del último pago", information:(selectedUserSubs.lastPaymentDate===null)? "-":   formatoFecha.format(new Date(selectedUserSubs.lastPaymentDate)) }]);}
  }, [selectedUserInfotmation, displaySubscriptionInformation, selectedUserSubs])
  

    return (
        <>
           <div
           className={`top-0 right-0 w-[35vw] pt-5 px-5 bg-white border-l h-full border-[#e7e6e6] fixed z-50
             transition-transform duration-700 ease-in-out transform ${showSidebar ? 'translate-x-0 drop-shadow-2xl' : 'translate-x-full'}`}
            >
              <button
                className="flex text-lg text-gray-600 items-center cursor-pointer fixed right-10"
                onClick={closeSidebar}
                >
                    x
              </button>
              <div className="flex flex-col">
                <div className="rounded-3xl px-4 py-3 m-5 w-fit border-2 border-[#6c3333] text-xs font-Pop-L tracking-widest uppercase text-gray-600">Información de Usuario</div>
                <div className="felx flex-col divide-y divide-dashed divide-[#e7e6e6] space-y-4">
                  <div className="p-4 grid grid-cols-2 gap-6">
                  {userData.map((data) => {
                      return (
                          <div key={data.title} className="blackText flex flex-col space-y-2">
                              <div className="text-xs font-Pop-L tracking-widest uppercase text-gray-700">{data.title}</div>
                              <div className="font-Pop-R text-xs text-gray-500">{data.information}</div>
                          </div>
                  );})}
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-6">
                  {userPersonalData.map((data) => {
                      return (
                          <div key={data.title} className="blackText flex flex-col space-y-2">
                              <div className="text-xs font-Pop-L tracking-widest uppercase text-gray-700">{data.title}</div>
                              <div className="font-Pop-R text-xs text-gray-500">{data.information}</div>
                          </div>
                  );})}
                  </div>
                  { (displaySubscriptionInformation && selectedUserSubs) &&
                    <div className="p-4 grid grid-cols-2 gap-6">
                    {subscriptionData.map((data) => {
                        return (
                            <div key={data.title} className="blackText flex flex-col space-y-2">
                                <div className="text-xs font-Pop-L tracking-widest uppercase text-gray-700">{data.title}</div>
                                <div className="font-Pop-R text-xs text-gray-500">{data.information}</div>
                            </div>
                    );})}
                    </div>
                }
                </div>
              </div>
            </div>
          </>
    )
  }
  
export default Sidebar