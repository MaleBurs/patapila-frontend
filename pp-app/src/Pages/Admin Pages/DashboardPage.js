import React from "react";
import AuthService from "../../services/auth.service";
import { MonthlySubscriptionStateContextProvider } from "../../Context/MonthlySubscriptionStateContext";
import FilterDate from "../../Components/Dashboards/FilterDate";
import { OpenChartsContextProvider } from "../../Context/OpenChartsContext";
import DashboardSection from "../../Components/Dashboards/DashboardSection";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import SectionTitleIndicator from "../../Components/Utiles/SectionTitleIndicator";
const DashboardPage = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <div className="space-y-12 mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.adminNavigation} currentUser={currentUser} activateAdminNotifications/>
      {currentUser ? ( 
        <MonthlySubscriptionStateContextProvider>
        <OpenChartsContextProvider>
        <SectionTitleIndicator
          title="Dashboard"
          subtitle="Herramienta de gestión de la información que monitoriza, analiza y muestra de manera visual los indicadores clave de desempeño (KPI), métricas y datos fundamentales acerca de las donaciones."
          rightSideFunctionality={
          <div className="basis-2/10 flex justify-end right-0">
          <FilterDate></FilterDate>
          </div>}
        />
        <DashboardSection></DashboardSection>
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
