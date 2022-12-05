import React from "react";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import SectionTitleIndicator from "../../Components/Utiles/SectionTitleIndicator";
import SectionSubtitleIndicator from "../../Components/Utiles/SectionSubtitleIndicator";
import AuthService from "../../services/auth.service";
import SubsPaymentTableInformationEmition from "../../Components/Tables/TablesInformation/SubsPaymentTableInformationEmition";
import Table from "../../Components/Tables/TableStructures/Table";
import { SelectionOnTableContexProvider } from "../../Context/SelectionsOnTable";
import Sidebar from "../../Components/Utiles/SideBar";
import { PaymentManagerContextProvider } from "../../Context/PaymentManagerContext";
import EmmitPaymentSubs from "../../Components/Tables/EmmitPaymentsSubs";
import PaymentManagerService from "../../services/paymentManager.service";

const PaymentManagerSubsPage = () => {
  const currentUser = AuthService.getCurrentUser();
  const getEmitedPayments = () => PaymentManagerService.getPaymentSubsE();
  return (
    <SelectionOnTableContexProvider>
    <PaymentManagerContextProvider>
    <>
    <div className="space-y-10 mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.adminNavigation} currentUser={currentUser} activateAdminNotifications/>
      {currentUser ? (
      <>
      <div className="almostWhiteBg">
        <SectionTitleIndicator
          title="Gestión de los Cobros de las Suscripciones"
          subtitle="Gestiona los cobros sugeridos y administra nuevos cobros"/>
        <Sidebar/>
   
        <EmmitPaymentSubs></EmmitPaymentSubs>
        
        <SectionSubtitleIndicator 
          title="Cobros Emitidos para Suscripciones de Usuarios"
          subtitle="Reporte histórico de los cobros emitidos para las suscripciones de usuarios"/>
        <div className="px-6 md:px-12 lg:px-20 mt-10">  
          <Table columns={SubsPaymentTableInformationEmition.columns} functionToLoadData={getEmitedPayments}></Table>
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