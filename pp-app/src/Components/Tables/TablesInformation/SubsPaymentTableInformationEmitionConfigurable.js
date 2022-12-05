import { OpenSideBarFromUser, EditableAmmount, SelectableDate } from '../TableUtils/SpecialCells';
import { NumberSearchFilter, DateRangeColumnFilter, dateBetweenFilterFn, AmountRangeColumnFilter, amountBetweenFilterFn } from '../TableUtils/Filters'

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
    accessor: "configuredPaymentDate",
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },
  {
    Header: "Fecha de Cobro",
    accessor: "paymentDate",
    Cell: SelectableDate,
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },
]

const SubsPaymentTableInformationEmitionConfigurable = {
    columns
  }
  export default SubsPaymentTableInformationEmitionConfigurable;