import React from "react";
import SubscriptionTableInformation from "../../Components/Tables/TablesInformation/SubscriptionTableInformation";
import AdminServices from "../../services/transactions.service";
import TableBasePage from "./TableBasePage";

const SubscriptionReportPage = () => {
  const getSubscriptionsForTable = (min, max) => AdminServices.getSubscriptions(min,max);
  return (
    <TableBasePage 
      title="Reporte de Suscripciones"
      subtitle="Reporte histórico de las suscripciones realizadas"
      dataForColumns={SubscriptionTableInformation.columns}
      functionToLoadData={getSubscriptionsForTable}
    />
  );
};
export default SubscriptionReportPage;