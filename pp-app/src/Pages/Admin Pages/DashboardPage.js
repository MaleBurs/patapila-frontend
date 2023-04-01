import React from "react";
import AuthService from "../../services/auth.service";
import { MonthlySubscriptionStateContextProvider } from "../../Context/MonthlySubscriptionStateContext";
import FilterDate from "../../Components/Dashboards/FilterDate";
import { OpenChartsContextProvider } from "../../Context/OpenChartsContext";
import DashboardSection from "../../Components/Dashboards/DashboardSection";
import SectionTitleIndicator from "../../Components/Utiles/SectionTitleIndicator";
import AdminNavBar from "../../Components/NavBars/AdminNavBar";
import {textos} from "./AdminPagesTexts";
const DashboardPage = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <div className="mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {currentUser ? ( 
        <MonthlySubscriptionStateContextProvider>
        <OpenChartsContextProvider>
        <AdminNavBar></AdminNavBar>
        <div class="space-y-12 mx-auto lg:-mt-5 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <SectionTitleIndicator
            title={textos.dashboardTitle}
            subtitle={textos.dashboardSubtitle}
            rightSideFunctionality={
            <div className="basis-2/10 flex justify-end right-0">
            <FilterDate></FilterDate>
            </div>}
          />
          <DashboardSection></DashboardSection>
        </div>
        </OpenChartsContextProvider>
        </MonthlySubscriptionStateContextProvider> 
      ) : (
      <></>
    )}
    </div> 
    </>
  );
};
export default DashboardPage;
