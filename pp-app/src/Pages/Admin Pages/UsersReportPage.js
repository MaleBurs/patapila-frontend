import React from "react";
import UsersTableInformation from "../../Components/Tables/UsersTableInformation";
import AdminServices from "../../services/transactions.service";
import TableBasePage from "./TableBasePage";

const UsersReportPage = () => {
  const getUsersForReportTable = (min, max) => AdminServices.getUsersForReport(min,max);
  return (
    <TableBasePage 
      title="Reporte Usuarios"
      subtitle="Reporte historico de los usuarios de la plataforma web de Pata Pila. Entre los usuarios se encuentran aquello con suscripciones y aquellos que todavía no tienen una suscripción."
      dataForColumns={UsersTableInformation.columns}
      functionToLoadData={getUsersForReportTable}
      selectPage="reporteUsuarios"
    />
  );
};
export default UsersReportPage;