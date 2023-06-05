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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      
      const dashboardInfo = await AdminServices.getDashboardsInfo(year);
      setDashboardData(dashboardInfo.data);
  
      if (dashboardInfo.data && Object.keys(dashboardInfo.data).length !== 0) {
        let monthlyAmountAuxByTrans = giveCorrectFormatToTransactionAmounts(dashboardInfo.data);
        setMonthlyAmountByTrans(monthlyAmountAuxByTrans);
  
        let monthlyAmountAuxBySubs = giveCorrectFormatToSuscriptionsAmounts(dashboardInfo.data);
        setMonthlyAmountBySubs(monthlyAmountAuxBySubs);
  
        let monthlyAmountAux = getTotalIncomeByMonth(monthlyAmountAuxByTrans, monthlyAmountAuxBySubs);
        setMonthlyAmount(monthlyAmountAux);
  
        let totalAmountByModeAux = giveCorrectFormatToAmountByMode(dashboardInfo)
        setTotalAmountByMode(totalAmountByModeAux);
  
        setTotalAmountMonth(monthlyAmountAux[month - 1].value);
        setTotalAmountMonthTrans(monthlyAmountAuxByTrans[month - 1].value);
        setTotalAmountMonthSubs(monthlyAmountAuxBySubs[month - 1].value);
        setTotalAmountByModeMonth(totalAmountByModeAux[month - 1]);

        setLoading(false);
      }
    };
  
    fetchData();
  }, [year, month]);
  

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
      loading,
      setLoading
    }
  }, [year, dashboardData, monthlyAmount, monthlyAmountByTrans, monthlyAmountBySubs, totalAmountMonth, totalAmountMonthTrans, totalAmountMonthSubs, totalAmountByMode, totalAmountByModeMonth])

  return (
    <DashboardContext.Provider value={value}>
      { props.children }
    </DashboardContext.Provider>
  )
}

function giveCorrectFormatToAmountByMode(dashboardInfo) {
  let totalAmountByModeAux = Object.entries(dashboardInfo.data.montoPorModo)
  totalAmountByModeAux = totalAmountByModeAux.map((m) => {
    return {
      label: datesValues[0].options[m[0] - 1].label,
      onlyTimeAmount: m[1].onlyTime,
      recurrentAmount: m[1].recurrent,
    }
  })
  return totalAmountByModeAux
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