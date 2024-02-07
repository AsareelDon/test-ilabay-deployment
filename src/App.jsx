import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/RouterDomWrapper/ProtectedRoute";
import LoginPage from "./components/LoginComponent/LoginPage";
import Dashboard from "./components/DashboardComponent/Dashboard";
import Layout from "./components/Layout";
import PageNotFound from "./components/pages/404NotFound";
import UnauthorizeAccess from "./components/pages/403Unauthorize";
import UserProfile from "./components/ProfileComponent/UserProfile";
import UserTable from "./components/TableComponents/UserTable";
import ConfirmEmail from "./components/ResetPwdComponent/VerifyEmail";
import ResetPassword from "./components/ResetPwdComponent/CreateNewPassword";
import ValidateAuth from "./components/RouterDomWrapper/ValidateAuth";
import Analytics from "./components/BinComponent/Analytics";
import BinLocation from "./components/BinComponent/BinLocation";
import ValidateOTP from "./components/ResetPwdComponent/VerifyOTPCode";
import { QueryClient, QueryClientProvider } from "react-query";
import PasswordReset from "./components/ResetPwdComponent/PasswordReset";
import useAuth from "./hooks/useAuth";

const ROLES = { 
  hasPrivilege: [
    'Administrator',
  ],
  normalPrivilege: [
    'Section Staff', 
    'Garbage Collector',
    'Section Head',
    'Section Head Assistant',
  ]
};

const queryClient = new QueryClient();

function App() {
  const { auth } = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={ <ValidateAuth /> } >
            <Route path='signin' element={ <LoginPage/> } />
            <Route path="password_reset" element={ <PasswordReset /> } />
          </Route>

          <Route element={ <Layout/> } >
            <Route element={<ProtectedRoutes allowedRoles={ ROLES.normalPrivilege } />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path='analytics' element={ <Analytics/> } />
              <Route path='user_table' element={ <UserTable/> }/>
              <Route path='collection_route' element={ <BinLocation/> } />
            </Route>

            <Route path='/administrator' element={<ProtectedRoutes allowedRoles={ ROLES.hasPrivilege } />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path='user_table' element={ <UserTable/> }/>
              <Route path='analytics' element={ <Analytics/> } />
              <Route path='collection_route' element={ <BinLocation/> } />
            </Route>
          </Route>

          <Route path='*' element={<PageNotFound />} />
          <Route path='/unauthorized' element={<UnauthorizeAccess />} />
        </Routes>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
