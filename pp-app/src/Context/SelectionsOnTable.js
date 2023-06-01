import React, { useState, useMemo, useEffect } from 'react';
import AuthService from "../services/auth.service"
import DonationService from "../services/donations.service";
import PersonalInformationServices from '../services/userPersonalInformation.service';

const SelectionOnTableContext = React.createContext()

export function SelectionOnTableContexProvider (props) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUserInfotmation, setSelectedUserInfotmation] = useState(null)
  const [selectedUserPersonalInfo, setSelectedUserPersonalInfo] = useState(null)
  const [selectedUserSubs, setSelectedUserSubs] = useState(null)
  useEffect(() => {
    AuthService.findUserById(selectedUser).then(res=>{res? setSelectedUserInfotmation(res.data) : setSelectedUserInfotmation(null)});
    PersonalInformationServices.getUserPersonalInformation(selectedUser).then(res=>{res? setSelectedUserPersonalInfo(res.data) : setSelectedUserPersonalInfo(null)});
    DonationService.getSubscription(selectedUser).then(res=>{res? setSelectedUserSubs(res.data) : setSelectedUserSubs(null)});
  }, [selectedUser])
  const value = useMemo(() => {
    return {
        selectedUser,
        setSelectedUser,
        showSidebar,
        setShowSidebar,
        selectedUserInfotmation,
        selectedUserSubs,
        selectedUserPersonalInfo
    }
  }, [selectedUser, showSidebar, selectedUserInfotmation, selectedUserSubs, selectedUserPersonalInfo])

  return (
    <SelectionOnTableContext.Provider value={value}>
      { props.children }
    </SelectionOnTableContext.Provider>
  )
}

export function useSelectionOnTable() {
  const context = React.useContext(SelectionOnTableContext)
  if (!context) {
    throw new Error('useSelectionOnTable debe estar en el proveedor SelectionOnTableContext')
  }
  return context
}