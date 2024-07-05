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
import NewAccount from "./pages/Dashboard/routes/AdminOverview/usersdetails/NewAccount";
import EmployerCard from "./pages/Dashboard/routes/Jobmanagement/EmployerCard";
import PostJobs from "./pages/Dashboard/routes/Jobmanagement/PostJobs";
import PostedJobPage from "./pages/Dashboard/routes/Jobmanagement/PostedJobPage";
import SubscriptionManagement from "./pages/Dashboard/routes/SubscriptionManagement/SubscriptionManagement";
// function Router() {
function Router() {
  return (
    <ReactRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/" element={<Admin />}>
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminOverview />} />
          <Route
            path="dashboard/userdetail/:id"
            element={<UserDetailedLink />}
          />
          <Route path="newaccount/:id" element={<NewAccount />} />
          <Route path="jobmanagement/postjob" element={<PostJobs />} />
          <Route path="postedjobs" element={<PostedJobPage />} />
          <Route
            path="subscriptionManagement"
            element={<SubscriptionManagement />}
          />
          <Route path="vetting" element={<Vetting />} />
          <Route path="review-talent/:id" element={<ViewTalent />} />
          <Route path="view-talent" element={<ViewTalent />} />
          <Route path="payments" element={<Transactions />} />
          <Route path="jobmanagement" element={<Jobmanagement />} />
          <Route path="health" element={<Systemhealth />} />
        </Route>
      </Routes>
    </ReactRouter>
  );
}

export default Router;
