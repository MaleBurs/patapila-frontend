
const adminNavigation =[
  { name: 'Ajustes', path: "/settings"},
  { name: 'Reporte Transacciones', path:"/reporteTransacciones"},
  { name: 'Reporte Subscripciones', path:"/reporteSubscripciones"},
  { name: 'Dashboard', path:"/reportes"},
]

const userNavigation =[
  { name: "Donar", path:"/donar"},
  { name: "Inicio", path:"/inicio"},
  { name: 'Ajustes', path: "/settings"},
]

const navigationOptions = {
  adminNavigation,
  userNavigation,
}

export default navigationOptions