import React from "react";
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import Table from "../../Components/Tables/Table";
import Sidebar from "../../Components/Utiles/SideBar";
import { SelectionOnTableContexProvider } from "../../Context/SelectionsOnTable";
import SectionTitleIndicator from "../../Components/Utiles/SectionTitleIndicator";

const TableBasePage = (props) => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <SelectionOnTableContexProvider>
    <>
    <div className="space-y-10 mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.adminNavigation} currentUser={currentUser}/>
      {currentUser ? (
      <>
      <div className="almostWhiteBg">
        <Sidebar/>
        <SectionTitleIndicator
          title={props.title}
          subtitle={props.subtitle}/>
        <div className="px-6 md:px-12 lg:px-20 mt-10">     
          <Table columns={props.dataForColumns} functionToLoadData={props.functionToLoadData}></Table>
        </div>
      </div>
      </>
      ) : (
      <></>
      )}
    </div> 
    </>
    </SelectionOnTableContexProvider>
  );
};
export default TableBasePage;