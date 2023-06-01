import React from "react";
import SubscriptionTableInformation from "../../Components/Tables/SubscriptionTableInformation";
import AdminServices from "../../services/transactions.service";
import TableBasePage from "./TableBasePage";
import {textos} from "./AdminPagesTexts";

const SubscriptionReportPage = () => {
  const getSubscriptionsForTable = (min, max) => AdminServices.getSubscriptions(min,max);
  return (
    <TableBasePage 
      title={textos.suscriptionsTitle}
      subtitle={textos.suscriptionsSubtitle}
      dataForColumns={SubscriptionTableInformation.columns}
      functionToLoadData={getSubscriptionsForTable}
      selectPage="reporteSubscripciones"
    />
  );
};
export default SubscriptionReportPage;