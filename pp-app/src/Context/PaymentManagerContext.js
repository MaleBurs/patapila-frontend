import React, { useState, useMemo, useEffect } from 'react';

const PaymentManagerContext = React.createContext()

export function PaymentManagerContextProvider (props) {
  const [selectSugested, setSelectSugested] = useState(false)
  const [newPaymentAmount, setNewPaymentAmount] = useState(0)
  const [newPaymentUser, setNewPaymentUser] = useState(null)
  const [newPaymentDate, setNewPaymentDate] = useState(new Date())
  const [newPaymentUserOptions, setNewPaymentUserOptions] = useState([])
  useEffect(() => {
    setSelectSugested(false)
  }, [])
  const value = useMemo(() => {
    return {
        selectSugested,
        setSelectSugested,
        newPaymentAmount,
        setNewPaymentAmount,
        newPaymentUser,
        setNewPaymentUser,
        newPaymentUserOptions,
        setNewPaymentUserOptions,
        newPaymentDate,
        setNewPaymentDate
    }
  }, [selectSugested, newPaymentAmount,newPaymentUser,newPaymentUserOptions,newPaymentDate])

  return (
    <PaymentManagerContext.Provider value={value}>
      { props.children }
    </PaymentManagerContext.Provider>
  )
}

export function usePaymentManagerContext() {
  const context = React.useContext(PaymentManagerContext)
  if (!context) {
    throw new Error('usePaymentManagerContext debe estar en el proveedor PaymentManagerContext')
  }
  return context
}