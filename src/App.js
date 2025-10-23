import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { ProSidebarProvider } from "react-pro-sidebar";
import Registration from "./components/registration";
import ProtectedRoute from "./components/ProtectedRoute";
import DashBoard from "./components/dashboard";
import PasswordReset from "./components/passwordReset";
import AboutUs from "./components/aboutUs";
import Support from "./components/support";
import OurApp from "./components/aboutOurAndroidApp";
import TransactionsComponent from "./components/transactionsComponent";
import MainDashboard from "./components/MainDashboard";
import Settings from "./components/settings";
import Pricing from "./components/pricing";
import ResponsiveManager from "./components/ResponsivenessManager";
import MobileLogin from "./components/mobile/pages/Login";
import MobRegisteration from "./components/mobile/pages/Register";
import MobDashboard from "./components/mobile/pages/MobDashboard";
import BuyDataComponent from "./components/service-components/buyDataComponent";
import AirtimeToCash from "./components/service-components/airtimeToCash";
import TvSubcription from "./components/service-components/tvSubcription";
import BulkSMSComponent from "./components/service-components/bulkSms";
import BuyElectricSubscription from "./components/service-components/buyElectricSub";
import ResultChecking from "./components/service-components/result_checking_pin";
import BuyDataCardComponent from "./components/service-components/buyDataCard";
import BuyAirtimeComponent from "./components/service-components/buy_airtime_component";
import ProtectedMobRoute from "./components/protected-mod-route";
import MobileTransactions from "./components/mobile/pages/Transactions";
import MobileSupport from "./components/mobile/pages/MobSupport";
import AdminLoginPage from "./components/admin/admin-login";
import AdminDashBoard from "./components/admin";
import AdminHomePage from "./components/admin/admin-home";
import ServicePricingPage from "./components/admin/service-pricing";
import CustomersTransactionsPage from "./components/admin/transactions";
import SubscribersPage from "./components/admin/subscribers";
import FundingPage from "./components/admin/funding";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import ProtectedUrlRoute from "./components/admin/protectedUrlRoute";
import MobileProfile from "./components/mobile/pages/Profile";
import PinReset from "./components/pin-reset";
import PendingTransactionsPage from "./components/admin/pending-transactions";
import UsersNotification from "./components/admin/users-notification";

const App = () => (
  <ProSidebarProvider>
    <Routes>
      <Route path="/" element={<ResponsiveManager />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="mob-login" element={<MobileLogin />} />
      <Route path="mob-register" element={<MobRegisteration />} />

      <Route path="admin-login" element={<AdminLoginPage />} />

      <Route
        path="admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashBoard />
          </ProtectedAdminRoute>
        }
      >
        <Route
          path=""
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <AdminHomePage />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="service-pricing"
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <ServicePricingPage />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="customers-transactons"
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <CustomersTransactionsPage />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="subscribers"
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <SubscribersPage />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="funding"
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <FundingPage />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="pending-transactons"
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <PendingTransactionsPage />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="notifications"
          element={
            <ProtectedAdminRoute>
              <ProtectedUrlRoute>
                <UsersNotification />
              </ProtectedUrlRoute>
            </ProtectedAdminRoute>
          }
        />
      </Route>

      <Route
        path="mob-dashboard"
        element={
          <ProtectedMobRoute>
            <MobDashboard />
          </ProtectedMobRoute>
        }
      />

      <Route
        path="mob-profile"
        element={
          <ProtectedMobRoute>
            <MobileProfile />
          </ProtectedMobRoute>
        }
      />

      <Route
        path="mob-data"
        element={
          <ProtectedMobRoute>
            <BuyDataComponent />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-airtime"
        element={
          <ProtectedMobRoute>
            <BuyAirtimeComponent />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-electric"
        element={
          <ProtectedMobRoute>
            <BuyElectricSubscription />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-tv-sub"
        element={
          <ProtectedMobRoute>
            <TvSubcription />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-tv-sub"
        element={
          <ProtectedMobRoute>
            <TvSubcription />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-result"
        element={
          <ProtectedMobRoute>
            <ResultChecking />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-airtime-to-cash"
        element={
          <ProtectedMobRoute>
            <AirtimeToCash />
          </ProtectedMobRoute>
        }
      />
      <Route
        path="mob-transactions"
        element={
          <ProtectedMobRoute>
            <MobileTransactions />
          </ProtectedMobRoute>
        }
      />
      <Route path="mob-support" element={<MobileSupport />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<MainDashboard />} />
        <Route path="data" element={<BuyDataComponent />} />
        <Route path="airtime" element={<BuyAirtimeComponent />} />
        <Route path="data-card" element={<BuyDataCardComponent />} />
        <Route path="airtime-to-cash" element={<AirtimeToCash />} />
        <Route path="electric-sub" element={<BuyElectricSubscription />} />
        <Route path="tv-sub" element={<TvSubcription />} />
        <Route path="bulk-sms" element={<BulkSMSComponent />} />
        <Route path="school-card" element={<ResultChecking />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Support />} />
        <Route path="transactions" element={<TransactionsComponent />} />
        <Route path="settings" element={<Settings />} />
        <Route path="ourapp" element={<OurApp />} />
      </Route>
      <Route path="passreset" element={<PasswordReset />} />
      <Route path="pinreset" element={<PinReset />} />
      <Route path="ourapp" element={<OurApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </ProSidebarProvider>
);

export default App;
