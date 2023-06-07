import React, { useState, useMemo } from 'react';

const OpenChartsContext = React.createContext()

export function OpenChartsContextProvider (props) {
  const [showBarChart1, setShowBarChart1] = useState(false);
  const [showBarChart2, setShowBarChart2] = useState(false);
  const [showBarChart3, setShowBarChart3] = useState(false);
  const [showBarChart4, setShowBarChart4] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart2Cols, setShowBarChart2Cols] = useState(false);
 
  const value = useMemo(() => {
    return {
        showBarChart1,
        setShowBarChart1,
        showBarChart2,
        setShowBarChart2,
        showBarChart3,
        setShowBarChart3,
        showBarChart4,
        setShowBarChart4,
        showPieChart, 
        setShowPieChart,
        showBarChart2Cols,
        setShowBarChart2Cols
    }
  }, [showPieChart, showBarChart1, showBarChart2, showBarChart3, showBarChart2Cols])

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