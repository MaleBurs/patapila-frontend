import React, { useState, useMemo, useEffect } from 'react'
import AdminServices from '../services/transactions.service'
import datesValues from '../Values/datesValues'

const DashboardContext = React.createContext()

export function DashboardContextProvider(props) {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [dashboardData, setDashboardData] = useState({});
  const [ monthlyAmount , setMonthlyAmount ] = useState([]);
  const [ monthlyAmountByTrans , setMonthlyAmountByTrans ] = useState([]);
  const [ monthlyAmountBySubs , setMonthlyAmountBySubs ] = useState([]);
  const [totalAmountMonth, setTotalAmountMonth] = useState(0);
  const [totalAmountMonthTrans, setTotalAmountMonthTrans] = useState(0);
  const [totalAmountMonthSubs, setTotalAmountMonthSubs] = useState(0);
  const [totalAmountByMode, setTotalAmountByMode] = useState([]);
  const [totalAmountByModeMonth, setTotalAmountByModeMonth] = useState({onlyTimeAmount: 0, recurrentAmount: 0}); 
  
  useEffect(() => {
    AdminServices.getDashboardsInfo(year).then(res => {
      setDashboardData(res.data);
      console.log("Dashboard data:")
      console.log(dashboardData)

      let monthlyAmountAuxByTrans = giveCorrectFormatToTransactionAmounts(dashboardData)
      setMonthlyAmountByTrans(monthlyAmountAuxByTrans);

      let monthlyAmountAuxBySubs = giveCorrectFormatToSuscriptionsAmounts(dashboardData)
      setMonthlyAmountBySubs(monthlyAmountAuxBySubs);

      let monthlyAmountAux = getTotalIncomeByMonth(monthlyAmountAuxByTrans, monthlyAmountAuxBySubs);
      setMonthlyAmount(monthlyAmountAux);

      let totalAmountByModeAux = Object.entries(dashboardData.montoPorModo);
      totalAmountByModeAux = totalAmountByModeAux.map((m) => {
        return { label: datesValues[0].options[m[0] - 1].label, onlyTimeAmount: m[1].onlyTime, recurrentAmount: m[1].recurrent }
      })
      setTotalAmountByMode(totalAmountByModeAux);
      
      setTotalAmountMonth(monthlyAmount[month-1].value);
      setTotalAmountMonthTrans(monthlyAmountByTrans[month-1].value);
      setTotalAmountMonthSubs(monthlyAmountBySubs[month-1].value);
      setTotalAmountByModeMonth(totalAmountByMode[month-1])
     
    })
  }, [year, month])

  const value = useMemo(() => {
    return {
      month,
      setMonth,
      year, 
      setYear,
      dashboardData,
      monthlyAmount,
      monthlyAmountByTrans,
      monthlyAmountBySubs,
      totalAmountMonth,
      totalAmountMonthTrans,
      totalAmountMonthSubs,
      totalAmountByMode,
      totalAmountByModeMonth,
    }
  }, [year, dashboardData])

  return (
    <DashboardContext.Provider value={value}>
      { props.children }
    </DashboardContext.Provider>
  )
}

function getTotalIncomeByMonth(monthlyAmountAuxByTrans, monthlyAmountAuxBySubs) {
  return monthlyAmountAuxByTrans.map((obj, index) => {
    let addition = obj.value + monthlyAmountAuxBySubs[index].value
    return { label: obj.label, value: addition }
  })
}

function giveCorrectFormatToSuscriptionsAmounts(dashboardData) {
  let monthlyAmountAuxBySubs = Object.entries(dashboardData.montoSuscripciones)
  monthlyAmountAuxBySubs = monthlyAmountAuxBySubs.map((m) => {
    return { label: datesValues[0].options[m[0] - 1].label, value: m[1] }
  })
  return monthlyAmountAuxBySubs
}

function giveCorrectFormatToTransactionAmounts(dashboardData) {
  let monthlyAmountAuxByTrans = Object.entries(dashboardData.montoTransacciones)
  monthlyAmountAuxByTrans = monthlyAmountAuxByTrans.map((m) => {
    return { label: datesValues[0].options[m[0] - 1].label, value: m[1] }
  })
  return monthlyAmountAuxByTrans
}

export function useDashboardContext() {
  const context = React.useContext(DashboardContext)
  return context
}