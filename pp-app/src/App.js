import UserSettings from './Pages/UserHomePage/UserSettingsPage';
import LoginPage from './Pages/Registration-Autentification.js/LoginPage';
import ChangePasswordPage from './Pages/ChangeViaMailPasswordPages/PasswordResetEmailPage';
import PasswordResetPage from './Pages/ChangeViaMailPasswordPages/PasswordResetPage';
import React from "react";
import AuthService from './services/auth.service';
import { Routes, Route } from "react-router-dom";
import RegistrationPage from './Pages/Registration-Autentification.js/RegistrationPage';
import DonarPage from './Pages/Donations/Donar';
import OneTimePaymentsReportPage from './Pages/Admin Pages/OneTimePaymentsReportPage';
import DashboardPage from './Pages/Admin Pages/DashboardPage';
import SubscriptionReportPage from './Pages/Admin Pages/SubscriptionReportPage';
import RefferalsPage from './Pages/Registration-Autentification.js/RefferalsPage';
import UserHome from './Pages/UserHomePage/UserHomePage';
import PaymentManagerSubsPage from './Pages/Admin Pages/PaymentManagerSubsPage';

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path={"/"} element={<LoginPage />} />
          <Route exact path={"/login"} element={<LoginPage />} />
          <Route exact path={"/signup/:refferalId"} element={<RefferalsPage/>} />
          <Route exact path={"/signup"} element={<RegistrationPage/>} />
          <Route exact path="/ChangePasswordPage" element={<ChangePasswordPage />} />
          <Route exact path="/resetPassword/:token" element={<PasswordResetPage />} />
          {(AuthService.getCurrentUser()) ?
          (
          (isAdmin())  ?
          <>
          <Route exact path="/inicio" element={<OneTimePaymentsReportPage></OneTimePaymentsReportPage>} />
          <Route exact path="/reporteOnlyTimePayments" element={<OneTimePaymentsReportPage></OneTimePaymentsReportPage>} />
          <Route exact path="/gestorDeCobrosSuscripciones" element={<PaymentManagerSubsPage></PaymentManagerSubsPage>} />
          <Route exact path="/reporteSubscripciones" element={<SubscriptionReportPage></SubscriptionReportPage>} />
          <Route exact path="/reportes" element={<DashboardPage></DashboardPage>} />
          <Route exact path="/settings" element={<UserSettings />} />
          </>
          :
          <>
          <Route exact path="/inicio" element={<UserHome />} />
          <Route exact path="/settings" element={<UserSettings />} />
          <Route exact path="/donar" element={<DonarPage/>} />
          </>
          )
          : <></>
          }
        </Routes> 
      </div>   
    </>
  );

  function isAdmin() {
    return JSON.stringify((AuthService.getCurrentUser()).roles) === JSON.stringify(["ROLE_ADMIN"]);
  }
}