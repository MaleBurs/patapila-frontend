import React from "react";
import TransactionTableInformation from "../../Components/Tables/TransactionsTableInformation";
import AdminServices from "../../services/transactions.service";
import TableBasePage from "./TableBasePage";
import {textos} from "./AdminPagesTexts";

const TransactionReportPage = () => {
  const getTransactionsForTable = (min, max) => AdminServices.getTransactions(min,max);
  return (
    <TableBasePage 
      title={textos.transactionsTitle}
      subtitle={textos.transactionsSubtitle}
      dataForColumns={TransactionTableInformation.columns}
      functionToLoadData={getTransactionsForTable}
    />
  );
};
export default TransactionReportPage;