import React, { useState, useMemo } from 'react';

const OpenChartsContext = React.createContext()

export function OpenChartsContextProvider (props) {
  const [showBarChart, setShowBarChart] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
 
  const value = useMemo(() => {
    return {
        showBarChart,
        setShowBarChart,
        showPieChart, 
        setShowPieChart
    }
  }, [showBarChart, showPieChart])

  return (
    <OpenChartsContext.Provider value={value}>
      { props.children }
    </OpenChartsContext.Provider>
  )
}

export function useOpenChartsContext() {
  const context = React.useContext(OpenChartsContext)
  if (!context) {
    throw new Error('useSelectionOnTable debe estar en el proveedor OpenChartsContext')
  }
  return context
}