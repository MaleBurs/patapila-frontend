import { SelectUser, EditableAmmountForNewPayment, SelectableDateForNewPayment } from '../TableUtils/SpecialCells';

const columns =[
  {
    Header: "id",
    value:"#",
    Description:"",
    Cell: "defaultRenderer"
  },
  {
    Header: "Usuario",
    Description:"",
    Cell: <SelectUser/>,
  },
  {
    Header: "Monto",
    Description:"",
    Cell: <EditableAmmountForNewPayment/>,
  },
  {
    Header: "Fecha de Cobro/Pago",
    Description: "Al crear un nuevo cobro la fecha de configuracón se settea igual a la fecha de cobro.",
    Cell: <SelectableDateForNewPayment/>,
  },
]

const SubsNewPaymentTableInformation = {
    columns
  }
  export default SubsNewPaymentTableInformation;