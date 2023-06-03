import { TraductorBooleano, EmprolijadorFechas, OpenSideBarFromUserId} from './SpecialCells';
import { SelectBoolFilter,RefferalsRangeColumnFilter, NumberSearchFilter, DateRangeColumnFilter, dateBetweenFilterFn, AmountRangeColumnFilter, amountBetweenFilterFn } from './Filters'

const columns =[
  {
    Header: "id",
    accessor: 'id',
    Cell: OpenSideBarFromUserId,
    Filter: NumberSearchFilter,
    filter: "rankedMatchSorter",
  },
  {
    Header: "Nombre",
    accessor: 'name',
    filter: "rankedMatchSorter",
  },
  {
    Header: "Apellido",
    accessor: 'lastname',
    filter: "rankedMatchSorter",
  },
  {
    Header: "Fecha en la que se unió",
    accessor: 'createdAt',
    Cell: EmprolijadorFechas,
    Filter: DateRangeColumnFilter,
    filter: dateBetweenFilterFn
  },
  {
    Header: "Correo",
    accessor: 'email',
    filter: "rankedMatchSorter",
  },
  {
    Header: "Total Donado",
    accessor: 'totalAmountDonated',
    Filter: AmountRangeColumnFilter,
    filter: amountBetweenFilterFn,
  },
  {
    Header: "Cantidad de Referidos",
    accessor: 'refferalsQuantity',
    Filter: RefferalsRangeColumnFilter,
    filter: amountBetweenFilterFn,
  },
  {
    Header: "Tiene Suscricpción",
    Cell: TraductorBooleano, 
    accessor: 'hasSubscription',
    Filter: SelectBoolFilter,
    filter: 'includes',
  },
  
]

const UsersTableInformation = {
    columns
  }
  export default UsersTableInformation;