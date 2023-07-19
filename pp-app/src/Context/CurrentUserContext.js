import React, { useState, useMemo } from 'react'
import AuthService from '../services/auth.service'
import DonationService from '../services/donations.service'
import { useEffect } from 'react'
import ImageService from '../services/images.service'

const CurrentUserContext = React.createContext()

export function CurrentUserContextProvider (props) {
  const currentUser = AuthService.getCurrentUser();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  useEffect(() => {
    console.log("SUBS")
    DonationService.getSubscription(currentUser.id).then(res=>{
      console.log(res.data.message)
      res? setSubscriptionData(res.data.message) : setSubscriptionData(null)
    });
  }, [currentUser.id])

  useEffect(() => {
    ImageService.getImage(currentUser.id).then((url) => {
      url ? setProfilePictureURL(url) : setProfilePictureURL(null)
    })
  }, []);

  const value = useMemo(() => {
    return {
        currentUser,
        subscriptionData,
        profilePictureURL,
    }
  }, [currentUser, subscriptionData, profilePictureURL])

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