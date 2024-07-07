import {
  BrowserRouter as ReactRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./pages/Dashboard";
import Login from "./pages/login";
import AdminOverview from "./pages/Dashboard/routes/AdminOverview";
import UserDetailedLink from "./pages/Dashboard/routes/AdminOverview/usersdetails/UserDetailedLink";
import Vetting from "./pages/Dashboard/routes/Vetting/Vetting";
import ViewTalent from "./pages/Dashboard/routes/ViewTalent";
import Transactions from "./pages/Dashboard/routes/Transactions";
import Jobmanagement from "./pages/Dashboard/routes/Jobmanagement/Jobmanagement";
import { Systemhealth } from "./pages/Dashboard/routes/Health/Systemhealth";
import { ProtectedRoute } from "./components/ProtectedRoute";
function Router() {
  return (
    <ReactRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Admin />}>
            <Route path="" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="userdetail/:id" element={<UserDetailedLink />} />
            <Route path="vetting" element={<Vetting />} />
            <Route path="review-talent/:id" element={<ViewTalent />} />
            <Route path="view-talent" element={<ViewTalent />} />
            <Route path="payments" element={<Transactions />} />
            <Route path="jobmanagement" element={<Jobmanagement />} />
            <Route path="health" element={<Systemhealth />} />
          </Route>
        </Route>
      </Routes>
    </ReactRouter>
  );
}
export default Router;
