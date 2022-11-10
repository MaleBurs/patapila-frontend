import { useSelectionOnTable } from "../../Context/SelectionsOnTable"
import { useEffect, useState } from "react";

const Sidebar = ({displaySubscriptionInformation}) => {
  const {showSidebar, setShowSidebar, setSelectedUser, selectedUserInfotmation, selectedUserSubs} = useSelectionOnTable();
  const [userData, setUserData] = useState([{}])
  const [subscriptionData, setSubscriptionData] = useState([{}])
  const closeSidebar= () => {
    setShowSidebar(false);
      setSelectedUser(null);
  }

  useEffect(() => {
    if (selectedUserInfotmation) setUserData([{title: "Nombre y Apellido", information: selectedUserInfotmation.name+' '+selectedUserInfotmation.lastname}, {title: "Id del usuario", information: selectedUserInfotmation.id},{title:"Email", information:selectedUserInfotmation.email}]);
    if (displaySubscriptionInformation && selectedUserSubs){  
    setSubscriptionData([
      {title: "Id de la subscripción", information: selectedUserSubs.id}, 
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
      {title:"Fecha del próximo pago", information:selectedUserSubs.nextPaymentDate}, 
      {title:"Fecha del último pago", information:selectedUserSubs.lastPaymentDate}]);}
  }, [selectedUserInfotmation, displaySubscriptionInformation, selectedUserSubs])
  

    return (
        <>
        { showSidebar ?
          <div
          className={`top-0 right-0 w-[35vw] bg-white border-l border-[#C3D5AF] fixed h-full z-50 ease-in-out duration-700 ${
            showSidebar ? "translate-x-0 " : "translate-x-full"
          }`}>
              <button
                className="flex text-lg text-white items-center cursor-pointer fixed right-10 top-6 z-50"
                onClick={closeSidebar}
                >
                    x
              </button>
              <div className="flex flex-col">
                <div className="p-8 text-base w-full font-Pop-M greenBg border-2 text-white">Información del Usuario</div>
                <div className="p-6 flex flex-col space-y-6">
                {userData.map((data) => {
                    return (
                        <div key={data.title} className="blackText flex flex-col space-y-2 lg:space-y-3">
                            <div className="tracking-wide text-sm font-Pop-M uppercase greenText">{data.title}</div>
                            <div className="font-Pop-R text-sm text-gray-500">{data.information}</div>
                        </div>
                );})}
                </div>
              </div>
              { (displaySubscriptionInformation && selectedUserSubs) ?
              <div className="flex flex-col">
                <div className="p-8 text-base w-full font-Pop-M greenBg border-2 text-white">Subscripción del Usuario</div>
                <div className="p-6 grid grid-cols-2 gap-4">
                {subscriptionData.map((data) => {
                    return (
                        <div key={data.title} className="blackText flex flex-col space-y-2 lg:space-y-3">
                            <div className="tracking-wide text-sm font-Pop-M uppercase greenText">{data.title}</div>
                            <div className="font-Pop-R text-sm text-gray-500">{data.information}</div>
                        </div>
                );})}
                </div>
              </div>
              :<></>
              }
            </div>
            : <></>}
          </>
    )
  }
  
export default Sidebar