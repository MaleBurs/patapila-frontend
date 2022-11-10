import React, { useState, useMemo } from 'react'

const SubModContext = React.createContext()

export function SubModContextProvider (props) {
  const [userWantsToModifySubs, setIfUserWantsToModifySubs] = useState(false);

  const value = useMemo(() => {
    return {
        userWantsToModifySubs,
        setIfUserWantsToModifySubs,
    }
  }, [userWantsToModifySubs])

  return (
    <SubModContext.Provider value={value}>
      { props.children }
    </SubModContext.Provider>
  )
}

export function useSubModContext() {
  const context = React.useContext(SubModContext)
  if (!context) {
    throw new Error('useFrequency debe estar en el proveedor SubModContext')
  }
  return context
}