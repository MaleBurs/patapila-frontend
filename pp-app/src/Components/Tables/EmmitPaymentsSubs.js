import React, { useEffect } from "react";
import SubsPaymentTableInformationEmition from "./TablesInformation/SubsPaymentTableInformationEmition";
import SubsPaymentsTableInformation from "../../Components/Tables/TablesInformation/SubsPaymentsTableInformation"
import AdminServices from "../../services/transactions.service";
import EditablePaymentSubsTable from "../../Components/Tables/TableStructures/EditablePaymentSubsTable";
import TableToSelectubSugestions from "./TableStructures/TableToSelectubSugestions";
import { usePaymentManagerContext } from "../../Context/PaymentManagerContext";
import SectionSubtitleIndicator from "../Utiles/SectionSubtitleIndicator";
import PaymentManagerService from "../../services/paymentManager.service";

const EmmitPaymentSubs= () => {
  const {selectSugested} = usePaymentManagerContext();
  const getRecurrentTransactions = (min, max) => AdminServices.getRecurrentTransactions(min,max);
  const getPaymentsPendingToEmmit = () => PaymentManagerService.getPaymentSubsNE();

  return (
    <>
    {selectSugested ?
    <>
    <SectionSubtitleIndicator 
          title="Cobros Sugeridos"
          subtitle="Cobros Sugeridos por el sistema. Seleccione los cobros que desee agregar, modificar y emitir."/>
    <div className="px-6 md:px-12 lg:px-20 mt-10 space-y-4"> 
        <TableToSelectubSugestions columns={SubsPaymentsTableInformation.columns} functionToLoadData={getRecurrentTransactions}></TableToSelectubSugestions>
    </div>
    </>
    :
    <>
    <SectionSubtitleIndicator 
          title="Cobros a Emitir"
          subtitle="Cobros a emitir respecto a las suscripciones"/>
    <div className="px-6 md:px-12 lg:px-20 mt-10 space-y-4"> 
        <EditablePaymentSubsTable columns={SubsPaymentTableInformationEmition.columns} functionToLoadData={getPaymentsPendingToEmmit}></EditablePaymentSubsTable>
    </div>
    </>}
    </>
  );
};
export default EmmitPaymentSubs; 