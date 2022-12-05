import React from "react";
import OnlyTimePaymentsTableInformation from "../../Components/Tables/TablesInformation/OnlyTimePaymentsTableInformation";
import AdminServices from "../../services/transactions.service";
import TableBasePage from "./TableBasePage";

const OneTimePaymentsReportPage = () => {
  const getOnlyTimeTransactions = (min, max) => AdminServices.getOnlyTimeTransactions(min,max);
  return (
    <TableBasePage 
      title="Reporte de los Cobros por Donaciones Únicas"
      subtitle="Reporte histórico de los cobros emitidos por donaciones de una única vez."
      dataForColumns={OnlyTimePaymentsTableInformation.columns}
      functionToLoadData={getOnlyTimeTransactions}
    />
  );
};
export default OneTimePaymentsReportPage;