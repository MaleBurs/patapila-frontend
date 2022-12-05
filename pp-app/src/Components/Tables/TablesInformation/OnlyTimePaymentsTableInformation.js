import { StatusPillTransactions, TransactionType, OpenSideBarFromUser } from '../TableUtils/SpecialCells';
import { SelectModoFilter, SelectStateFilter, NumberSearchFilter, DateRangeColumnFilter, dateBetweenFilterFn, AmountRangeColumnFilter, amountBetweenFilterFn } from '../TableUtils/Filters'

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
    Filter: AmountRangeColumnFilter,
    filter: amountBetweenFilterFn,
  },
  {
    Header: "Modo",
    accessor: 'type',
    Cell: TransactionType,
    Filter: SelectModoFilter,
    filter: 'includes',
  },
  {
    Header: "Fecha de Pago",
    accessor: "paymentDate",
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },{
    Header: "Estado",
    accessor: "transactionState.state",
    Cell: StatusPillTransactions,
    Filter: SelectStateFilter,  // new
    filter: 'includes',
  }
]

const OnlyTimePaymentsTableInformation = {
    columns
  }
  export default OnlyTimePaymentsTableInformation;