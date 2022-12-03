import React, { useState, useEffect, useMemo } from 'react'
import amountsValues from '../Values/amountValues'

const AmountContext = React.createContext()

export function AmountContextProvider(props) {
  const [amounts, setAmounts] = useState(amountsValues)
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [payedAmount, setPayedAmount] = useState(0)

  useEffect(() => {
    setAmounts(amountsValues)
  }, [amounts])

  const value = useMemo(() => {
    return {
      amounts,
      setAmounts,
      selectedAmount,
      setSelectedAmount,
      payedAmount,
      setPayedAmount,
      amountIndex: () => {
        return amounts.indexOf(selectedAmount)
      }
    }
  }, [amounts, selectedAmount, payedAmount])

  return (
    <AmountContext.Provider value={value}>
      { props.children }
    </AmountContext.Provider>
  )
}

export function useAmount() {
  const context = React.useContext(AmountContext)
  if (!context) {
    throw new Error('useAmount debe estar en el proveedor AmountContext')
  }
  return context
}