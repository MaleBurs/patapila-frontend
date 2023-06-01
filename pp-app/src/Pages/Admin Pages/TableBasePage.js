import React from "react";
import AuthService from "../../services/auth.service";
import AdminNavBar from "../../Components/NavBars/AdminNavBar";
import Table from "../../Components/Tables/Table";
import Sidebar from "../../Components/Utiles/SideBar";
import { SelectionOnTableContexProvider } from "../../Context/SelectionsOnTable";
import AdminInformationSection from "../../Components/Admin/AdminInformationSection";
import { CurrentAdminContextProvider } from "../../Context/CurrentAdminContext";

const TableBasePage = (props) => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <SelectionOnTableContexProvider>
    <CurrentAdminContextProvider>
    <>
    <AdminNavBar></AdminNavBar>
    <div className="mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {currentUser ? (
      <>
      <div className="almostWhiteBg">
        <Sidebar displaySubscriptionInformation={true}/>
        <AdminInformationSection
          backToHome={false}
          title={props.title}
          description={props.subtitle}
          select={props.selectPage}
        ></AdminInformationSection>
        
        <div className="px-6 md:px-12 lg:px-20 mt-8">  
          <Table columns={props.dataForColumns} functionToLoadData={props.functionToLoadData}></Table>
        </div>
      </div>
      </>
      ) : (
      <></>
      )}
    </div> 
    </>
    </CurrentAdminContextProvider>
    </SelectionOnTableContexProvider>
  );
};
export default TableBasePage;