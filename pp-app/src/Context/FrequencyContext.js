import frequencyEnum from '../Values/frequency.enum'
import React, { useState, useMemo } from 'react'


const FrequencyContext = React.createContext()

export function FrequencyContextProvider (props) {
  const [selectedFrequency, setSelectedFrequency] = useState(() => { return frequencyEnum.monthly })

  const value = useMemo(() => {
    return {
      selectedFrequency,
      setSelectedFrequency
    }
  }, [selectedFrequency])

  return (
    <FrequencyContext.Provider value={value}>
      { props.children }
    </FrequencyContext.Provider>
  )
}

export function useFrequency() {
  const context = React.useContext(FrequencyContext)
  if (!context) {
    throw new Error('useFrequency debe estar en el proveedor FrequencyContext')
  }
  return context
}