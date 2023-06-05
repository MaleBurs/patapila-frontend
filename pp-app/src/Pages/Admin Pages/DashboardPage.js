import React from "react";
import AuthService from "../../services/auth.service";
import { MonthlySubscriptionStateContextProvider } from "../../Context/MonthlySubscriptionStateContext";
import FilterDate from "../../Components/Dashboards/FilterDate";
import { OpenChartsContextProvider } from "../../Context/OpenChartsContext";
import DashboardSection from "../../Components/Dashboards/DashboardSection";
import AdminNavBar from "../../Components/NavBars/AdminNavBar";
import AdminInformationSection from "../../Components/Admin/AdminInformationSection";
import { CurrentAdminContextProvider } from "../../Context/CurrentAdminContext";
import { DashboardContextProvider } from "../../Context/DashboardContext";
import {textos} from "./AdminPagesTexts";
const DashboardPage = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
    <CurrentAdminContextProvider> 
      <AdminNavBar></AdminNavBar>
      <div className="mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {currentUser ? ( 
        <DashboardContextProvider>
        <MonthlySubscriptionStateContextProvider>
        <OpenChartsContextProvider>
        <div className="almostWhiteBg">
          <AdminInformationSection
            backToHome={false}
            title={textos.dashboardTitle}
            description={textos.dashboardSubtitle}
            select="dashboards"
          ></AdminInformationSection>
          <div className="flex justify-start right-0 mt-5 ml-10">
              <FilterDate></FilterDate>
          </div>
          <DashboardSection></DashboardSection>
        </div>
        </OpenChartsContextProvider>
        </MonthlySubscriptionStateContextProvider> 
        </DashboardContextProvider>
      ) : (
      <></>
    )}
    </div>
    </CurrentAdminContextProvider> 
    </>
  );
};
export default DashboardPage;
