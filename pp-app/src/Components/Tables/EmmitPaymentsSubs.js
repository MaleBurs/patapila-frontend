import React from "react";
import SubsPaymentTableInformationToEmmit from "../../Components/Tables/SubsPaymentTableInformationToEmmit";
import SubsPaymentsTableInformation from "../../Components/Tables/SubsPaymentsTableInformation"
import AdminServices from "../../services/transactions.service";
import EditablePaymentSubsTable from "../../Components/Tables/EditablePaymentSubsTable";
import TableToSelectubSugestions from "./TableToSelectubSugestions";
import { usePaymentManagerContext } from "../../Context/PaymentManagerContext";
import SectionSubtitleIndicator from "../Utiles/SectionSubtitleIndicator";

const EmmitPaymentSubs= () => {
  const {selectSugested} = usePaymentManagerContext();
  const getRecurrentTransactions = (min, max) => AdminServices.getRecurrentTransactions(min,max);
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
        <EditablePaymentSubsTable columns={SubsPaymentTableInformationToEmmit.columns} functionToLoadData={getRecurrentTransactions}></EditablePaymentSubsTable>
    </div>
    </>}
    </>
  );
};
export default EmmitPaymentSubs; 