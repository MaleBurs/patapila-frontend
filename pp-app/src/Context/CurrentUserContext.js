import React, { useState, useMemo } from 'react'
import AuthService from '../services/auth.service'
import PersonalInformationServices from '../services/userPersonalInformation.service'
import DonationService from '../services/donations.service'
import { useEffect } from 'react'
import PublicProfileInformationServices from '../services/publicProfileInformation.service'
import PublicProfileConfigurationServices from '../services/publicProfileConfiguration.service'


const CurrentUserContext = React.createContext()

export function CurrentUserContextProvider (props) {
  const currentUser = AuthService.getCurrentUser();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const profilePicture = AuthService.getUserProfilePhoto();
  const publicProfileConfig = PublicProfileConfigurationServices.getPublicProfileConfig();
  const publicProfileInf = PublicProfileInformationServices.getPublicProfileInf();
  const userPersonalInf = PersonalInformationServices.getUserPersonalInf();

  useEffect(() => {
    DonationService.getSubscription(currentUser.id).then(res=>{res? setSubscriptionData(res.data) : setSubscriptionData(null)});
  }, [currentUser.id])

  const value = useMemo(() => {
    return {
        currentUser,
        subscriptionData,
        profilePicture,
        publicProfileConfig,
        publicProfileInf,
        userPersonalInf
    }
  }, [currentUser, subscriptionData, profilePicture, publicProfileConfig, publicProfileInf, userPersonalInf])

  return (
    <CurrentUserContext.Provider value={value}>
      { props.children }
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  const context = React.useContext(CurrentUserContext)
  if (!context) {
    throw new Error('useFrequency debe estar en el proveedor CurrentUserContext')
  }
  return context
}