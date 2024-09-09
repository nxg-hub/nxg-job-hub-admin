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
import ReviewJob from "./pages/Dashboard/routes/Jobmanagement/ReviewJob";
import { Systemhealth } from "./pages/Dashboard/routes/Health/Systemhealth";
import SubscriptionManagement from "./pages/Dashboard/routes/SubscriptionManagement/SubscriptionManagement";
import PostedJobPage from "./pages/Dashboard/routes/Jobmanagement/PostedJobPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NewAccount from "./pages/Dashboard/routes/AdminOverview/usersdetails/components/NewAccount";
import PostJobs from "./pages/Dashboard/routes/Jobmanagement/PostJobs";
import EmployerReview from "./pages/Dashboard/routes/ViewTalent/EmployerReview";
import NewUsers from "./pages/Dashboard/routes/NewUsers/NewUsers";
import History from "./pages/Dashboard/routes/History/History";
import FinalReview from "./pages/Dashboard/routes/Jobmanagement/FinalReview";
import Interview from "./pages/Dashboard/routes/Interview/Interview";
function Router() {
  return (
    <ReactRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Admin />}>
            <Route path="" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route
              path="/dashboard/userdetail/:id/:userType"
              element={<UserDetailedLink />}
            />
            <Route path="/newaccount/:id" element={<NewAccount />} />
            <Route path="vetting" element={<Vetting />} />
            <Route path="newUsers" element={<NewUsers />} />
            <Route path="review-talent/:id/" element={<ViewTalent />} />
            <Route path="review-employer/:id/" element={<EmployerReview />} />
            <Route path="view-talent" element={<ViewTalent />} />
            <Route path="payments" element={<Transactions />} />
            <Route path="jobmanagement" element={<Jobmanagement />} />
            <Route path="jobmanagement/postjob" element={<PostJobs />} />
            <Route path="health" element={<Systemhealth />} />
            <Route path="postedJobs" element={<PostedJobPage />} />
            <Route path="history" element={<History />} />
            <Route path="interview" element={<Interview />} />
            <Route path="review-posted-job/:id" element={<ReviewJob />} />
            <Route path="review-appliedtalent/:id" element={<FinalReview />} />
            <Route
              path="subscriptionmanagement"
              element={<SubscriptionManagement />}
            />
          </Route>
        </Route>
      </Routes>
    </ReactRouter>
  );
}

export default Router;
