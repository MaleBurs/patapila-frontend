import React from "react";
import TransactionTableInformation from "../../Components/Tables/TransactionsTableInformation";
import AdminServices from "../../services/transactions.service";
import TableBasePage from "./TableBasePage";

const TransactionReportPage = () => {
  const getTransactionsForTable = (min, max) => AdminServices.getTransactions(min,max);
  return (
    <TableBasePage 
      title="Reporte de Transacciones"
      subtitle="Reporte historico de las transacciones realizadas"
      dataForColumns={TransactionTableInformation.columns}
      functionToLoadData={getTransactionsForTable}
    />
  );
};
export default TransactionReportPage;