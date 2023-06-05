import React, { useState, useMemo } from 'react';

const OpenChartsContext = React.createContext()

export function OpenChartsContextProvider (props) {
  const [showBarChart1, setShowBarChart1] = useState(false);
  const [showBarChart2, setShowBarChart2] = useState(false);
  const [showBarChart3, setShowBarChart3] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
 
  const value = useMemo(() => {
    return {
        showBarChart1,
        setShowBarChart1,
        showBarChart2,
        setShowBarChart2,
        showBarChart3,
        setShowBarChart3,
        showPieChart, 
        setShowPieChart
    }
  }, [showPieChart, showBarChart1, showBarChart2, showBarChart3])

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