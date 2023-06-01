import React, { useMemo } from 'react'
import AuthService from '../services/auth.service'


const CurrentAdminContext = React.createContext()

export function CurrentAdminContextProvider (props) {
  const currentUser = AuthService.getCurrentUser();
  const profilePicture = AuthService.getUserProfilePhoto();


  const value = useMemo(() => {
    return {
        currentUser,
        profilePicture,
    }
  }, [currentUser, profilePicture])

  return (
    <CurrentAdminContext.Provider value={value}>
      { props.children }
    </CurrentAdminContext.Provider>
  )
}

export function useCurrentAdmin() {
  const context = React.useContext(CurrentAdminContext)
  if (!context) {
    throw new Error('useFrequency debe estar en el proveedor CurrentAdminContext')
  }
  return context
}