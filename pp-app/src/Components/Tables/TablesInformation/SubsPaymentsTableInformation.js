import { OpenSideBarFromUser } from '../TableUtils/SpecialCells';
import { NumberSearchFilter, DateRangeColumnFilter, dateBetweenFilterFn, AmountRangeColumnFilter, amountBetweenFilterFn } from '../TableUtils/Filters'

const columns =[
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
    Header: "Fecha de Pago Configurada",
    accessor: "paymentDate",
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  }
]

const SubsPaymentsTableInformation = {
    columns
  }
  export default SubsPaymentsTableInformation;