import { StatusPillSubscriptions, PaymentFrecuency, OpenSideBarFromUser } from './SpecialCells';
import { SelectStateFilterSubscriptions, SelectPeriodicidadFilter, NumberSearchFilter, DateRangeColumnFilter, dateBetweenFilterFn, AmountRangeColumnFilter, amountBetweenFilterFn } from './Filters'

const columns =[
  {
    Header: "id",
    accessor: 'id',
    Filter: NumberSearchFilter,
    filter: "rankedMatchSorter",
  },
  {
    Header: "Email del usuario",
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
  },{
    Header: "Fecha del último Pago",
    accessor: "lastPaymentDate",
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },
  {
    Header: "Fecha del Próximo Pago",
    accessor: "nextPaymentDate",
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },{
    Header: "Frecuencia de Pago",
    accessor: "frequency",
    Cell: PaymentFrecuency,
    Filter: SelectPeriodicidadFilter,
    filter: 'includes',
    },{
    Header: "Estado",
    accessor: "subscriptionState.state",
    Cell: StatusPillSubscriptions,
    Filter: SelectStateFilterSubscriptions,
    filter: 'includes',
  }
]

const SubscriptionTableInformation = {
    columns
  }
  export default SubscriptionTableInformation;