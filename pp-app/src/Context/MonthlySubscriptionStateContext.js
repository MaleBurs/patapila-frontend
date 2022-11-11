import React, { useState, useMemo, useEffect } from 'react'
import DonationService from '../services/donations.service'
import AdminServices from '../services/transactions.service'
import datesValues from '../Values/datesValues'

const MonthlySubscriptionStateContext = React.createContext()

export function MonthlySubscriptionStateContextProvider(props) {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthlyData, setMonthlyData] = useState([]);

  const noChartData = (chartData) => {
    var sum =0;
    for(const item of chartData){
      sum=sum+item;
    }
    return sum ===0;
  }

  /*  const setMonthsIncome = async () => {
    const options = datesValues[0].options
    for (const el of options) {
        await AdminServices.getMonthIncome(el.value).then(res => setMonthlyAmounts(prev => [...prev, res.data.total]))
    }
}*/
  const setMonthsIncome = async () => {

    const options = datesValues[0].options;
    for (const el of options) {
        await DonationService.subscriptionsByMonth(el.value,year).then(res=> {setChartDataBasedOnMonthlySubs(res, el)});
    }
  }

  const setChartDataBasedOnMonthlySubs = (res, el) =>{
    var a =0;
    var p=0;
    var c=0;
    var amount = 0;
    var newMonthData ={};
    for(const item of res.data){
      if(item.state=="A"){
      a=a+1;
      }else if(item.state=="P"){
        p=p+1;
      }else if(item.state=="C"){
        c=c+1
      }
    }
    if(!(noChartData([a,p,c]))){//Chequear total!=0 aca(llamamos a getmonthincome antes) y si es asi seteamos monthlydata
      AdminServices.getMonthIncome(el.value).then(res => 
        {
        if(!valueInMonthlyData(el.value)){
          amount = res.data.total;
          newMonthData ={value:el.value, subsStates: [a,p,c],  amount:amount, label:el.label};
          setMonthlyData(prev => [...prev, newMonthData]);
          }
        }
      )
    }
}

  const valueInMonthlyData = (value) => {
    if(monthlyData.length>0){
      for(const md of monthlyData){
        if (md.value == value) return true;
      }
    }
    return false;
  }
  
  useEffect(() => {
    setMonthsIncome();
  }, [month,year])

  const value = useMemo(() => {
    return {
      month,
      setMonth,
      year, 
      setYear,
      monthlyData,
    }
  }, [month, year, monthlyData])

  return (
    <MonthlySubscriptionStateContext.Provider value={value}>
      { props.children }
    </MonthlySubscriptionStateContext.Provider>
  )
}

export function useMonthlySubscriptionStateContext() {
  const context = React.useContext(MonthlySubscriptionStateContext)
  return context
}