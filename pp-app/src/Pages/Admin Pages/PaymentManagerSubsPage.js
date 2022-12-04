import React from "react";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import SectionTitleIndicator from "../../Components/Utiles/SectionTitleIndicator";
import SectionSubtitleIndicator from "../../Components/Utiles/SectionSubtitleIndicator";
import AuthService from "../../services/auth.service";
import SubsPaymentTableInformationEmmited from "../../Components/Tables/SubsPaymentTableInformationEmmited";
import Table from "../../Components/Tables/Table";
import AdminServices from "../../services/transactions.service";
import { SelectionOnTableContexProvider } from "../../Context/SelectionsOnTable";
import Sidebar from "../../Components/Utiles/SideBar";
import { PaymentManagerContextProvider } from "../../Context/PaymentManagerContext";
import EmmitPaymentSubs from "../../Components/Tables/EmmitPaymentsSubs";

const PaymentManagerSubsPage = () => {
  const currentUser = AuthService.getCurrentUser();
  const getRecurrentTransactions = (min, max) => AdminServices.getRecurrentTransactions(min,max);
  return (
    <SelectionOnTableContexProvider>
    <PaymentManagerContextProvider>
    <>
    <div className="space-y-10 mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.adminNavigation} currentUser={currentUser}/>
      {currentUser ? (
      <>
      <div className="almostWhiteBg">
        <SectionTitleIndicator
          title="Gestion de los Cobros de las Suscripciones"
          subtitle="Gestiona los cobros sugeridos y administra nuevos cobros"/>
        <Sidebar/>
   
        <EmmitPaymentSubs></EmmitPaymentSubs>

        <SectionSubtitleIndicator 
          title="Cobros Emitidos para Suscripciones de Usuarios"
          subtitle="Reporte historico de los cobros emitidos para las suscripciones de usuarios"/>
        <div className="px-6 md:px-12 lg:px-20 mt-10">  
          <Table columns={SubsPaymentTableInformationEmmited.columns} functionToLoadData={getRecurrentTransactions}></Table>
        </div>
      </div>
      </>
      ) : (
      <></>
      )}
    </div> 
    </>
    </PaymentManagerContextProvider>
    </SelectionOnTableContexProvider>
  );
};
export default PaymentManagerSubsPage; 