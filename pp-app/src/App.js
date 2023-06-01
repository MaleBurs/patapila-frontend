import UserSettingsPage from './Pages/UserHomePage/UserSettingsPage';
import LoginPage from './Pages/Registration-Autentification.js/LoginPage';
import ChangePasswordPage from './Pages/ChangeViaMailPasswordPages/PasswordResetEmailPage';
import PasswordResetPage from './Pages/ChangeViaMailPasswordPages/PasswordResetPage';
import React from "react";
import AuthService from './services/auth.service';
import { Routes, Route } from "react-router-dom";
import RegistrationPage from './Pages/Registration-Autentification.js/RegistrationPage';
import DonarPage from './Pages/Donations/Donar';
import TransactionReportPage from './Pages/Admin Pages/TransactionsReportPage';
import DashboardPage from './Pages/Admin Pages/DashboardPage';
import SubscriptionReportPage from './Pages/Admin Pages/SubscriptionReportPage';
import RefferalsPage from './Pages/Registration-Autentification.js/RefferalsPage';
import UserHome from './Pages/UserHomePage/UserHomePage';
import PaginaAgradecimiento from './Pages/Donations/PaginaAgradecimiento';
import UserDonationHistoryPage from './Pages/UserHomePage/UserDonationHistoryPage';
import UserPublicProfilePage from './Pages/UserHomePage/UserPublicProfilePage';

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path={"/"} element={<LoginPage />} />
          <Route exact path={"/login"} element={<LoginPage />} />
          <Route exact path={"/signup/:refferalURL"} element={<RefferalsPage/>} />
          <Route exact path={"/signup"} element={<RegistrationPage/>} />
          <Route exact path="/ChangePasswordPage" element={<ChangePasswordPage />} />
          <Route exact path="/resetPassword/:token" element={<PasswordResetPage />} />
          {(AuthService.getCurrentUser()) ?
          (
          (isAdmin())  ?
          <>
          <Route exact path="/inicio" element={<TransactionReportPage></TransactionReportPage>} />
          <Route exact path="/reporteTransacciones" element={<TransactionReportPage></TransactionReportPage>} />
          <Route exact path="/reporteSubscripciones" element={<SubscriptionReportPage></SubscriptionReportPage>} />
          <Route exact path="/dashboards" element={<DashboardPage></DashboardPage>} />
          <Route exact path="/settings" element={<UserSettingsPage />} />
          </>
          :
          <>
          <Route exact path="/inicio" element={<UserHome />} />
          <Route exact path="/donar" element={<DonarPage/>} />
          <Route exact path="/gracias" element={<PaginaAgradecimiento/>} /> 
          <Route exact path="/historialDonaciones" element={<UserDonationHistoryPage/>} />
          <Route exact path="/settings" element={<UserSettingsPage />} />
          <Route exact path="/miPerfil" element={<UserPublicProfilePage />} />
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