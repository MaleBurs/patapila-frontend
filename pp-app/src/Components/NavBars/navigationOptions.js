
const adminNavigation =[
  { name: 'Ajustes', path: "/settings"},
  { name: 'Reporte Cobros Únicos', path:"/reporteOnlyTimePayments"},
  { name: 'Gestor de Cobros de Suscripciones', path:"/gestorDeCobrosSuscripciones"},
  { name: 'Reporte Suscripciones', path:"/reporteSubscripciones"},
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