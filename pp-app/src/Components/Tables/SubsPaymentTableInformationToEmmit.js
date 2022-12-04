import { OpenSideBarFromUser, EditableAmmount, SelectableDate } from './SpecialCells';
import { NumberSearchFilter, DateRangeColumnFilter, dateBetweenFilterFn, AmountRangeColumnFilter, amountBetweenFilterFn } from './Filters'

const columns =[
  {
    Header: "id",
    accessor: 'id',
    Filter: NumberSearchFilter,
    filter: "rankedMatchSorter",
  },
  {
    Header: "Usuario",
    accessor: 'userId',
    Cell: OpenSideBarFromUser,
    Filter: NumberSearchFilter,
    filter: "rankedMatchSorter",
  },
  {
    Header: "Monto",
    accessor: 'amount',
    Cell: EditableAmmount,
    Filter: AmountRangeColumnFilter,
    filter: amountBetweenFilterFn,
  },
  {
    Header: "Fecha de Pago Configurada",
    accessor: "paymentDate",
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },
  {
    Header: "Fecha de Cobro",
    accessor: "realPaymentDate",
    Cell: SelectableDate,
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },
]

const SubsPaymentTableInformationToEmmit = {
    columns
  }
  export default SubsPaymentTableInformationToEmmit;