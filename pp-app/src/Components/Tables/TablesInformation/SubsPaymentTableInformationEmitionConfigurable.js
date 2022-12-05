import { OpenSideBarFromUserPayentEdition, EditableAmmountPayentEdition, SelectableDatePayentEdition } from '../TableUtils/SpecialCells';

const columns =[
  {
    Header: "id",
    Cell: "defaultRenderer",
    Description:"",
    accessor: 'id',
  },
  {
    Header: "Usuario",
    Cell: <OpenSideBarFromUserPayentEdition/>,
    Description:"",
    accessor: 'userId',
  },
  {
    Header: "Monto",
    Cell: <EditableAmmountPayentEdition/>,
    Description:"",
    accessor: "amount",
  },
  {
    Header: "Fecha de Pago Configurada",
    Cell: "defaultRenderer",
    Description:"",
    accessor: "configuredPaymentDate",
  },
  {
    Header: "Fecha de Cobro",
    Cell: <SelectableDatePayentEdition/>,
    Description:"",
    accessor: "paymentDate",
  },
]

const SubsPaymentTableInformationEmitionConfigurable = {
    columns
  }
  export default SubsPaymentTableInformationEmitionConfigurable;