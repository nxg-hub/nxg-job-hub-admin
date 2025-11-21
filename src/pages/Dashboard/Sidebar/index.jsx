import React, { useEffect, useState } from "react";
import Logo from "../../../static/images/nxg-logo.png";
import { PiUserCircle, PiShieldCheck, PiFileTextDuotone } from "react-icons/pi";
import { Health, Job, Logout, Wallet } from "../../../utils/SidebarIcons";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import "../adminstyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../Redux/UserSlice";
import { resetTalent } from "../../../Redux/TalentSlice";
import { resetEmployer } from "../../../Redux/EmployerSlice";
import { ClipboardClock, Mail, MessageCircleQuestionMark } from "lucide-react";

function AdminSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserSlice.user);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const menuItem = [
    { path: "dashboard", name: "User Management", icon: <PiUserCircle /> },
    { path: "jobmanagement", name: "Job Management", icon: <Job /> },
    { path: "vetting", name: "Vetting Oversight", icon: <PiShieldCheck /> },
    {
      path: "featuredTalent",
      name: "Featured Talents",
      icon: <PiShieldCheck />,
    },
    { path: "newUsers", name: "New Users", icon: <PiUserCircle /> },
    {
      path: "payments",
      name: "Payment & Transactions",
      icon: <PiFileTextDuotone />,
    },
    { path: "health", name: "System Health", icon: <Health /> },
    {
      path: "subscriptionmanagement",
      name: "Subscription Management",
      icon: <Wallet />,
    },
    { path: "postedJobs", name: "Posted Jobs", icon: <Job /> },
    { path: "history", name: "History", icon: <ClipboardClock /> },
    { path: "interview", name: "Interview", icon: <Mail /> },
    // { path: "feedBack", name: "Feedback", icon: <Health /> },
    { path: "help", name: "Support", icon: <MessageCircleQuestionMark /> },
    {
      path: "externalJobPost",
      name: "External Jobs Management",
      icon: <Job />,
    },
  ];

  useEffect(() => {
    dispatch(fetchUser(`/api/v1/auth/get-user`));
  }, []);

  const logOutUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout?userId=${
          user?.id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );

      if (response.ok) {
        localStorage.clear();
        dispatch(resetTalent());
        dispatch(resetEmployer());
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar-main">
      {/* Logo */}
      <div className="side-logo flex justify-center py-4">
        <img src={Logo} alt="Nxg-logo" className="w-[120px]" />
      </div>

      {/* Menu Items */}
      <div className="menu-icons-container mt-6 space-y-2">
        {menuItem.map((item, index) => (
          <NavLink
            end
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `dashboardItem flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-[#006A90] text-white" : "hover:bg-gray-100"
              }`
            }>
            <span className="text-xl">{item.icon}</span>
            <p className="text-[15px] font-medium">{item.name}</p>
          </NavLink>
        ))}
      </div>

      {/* Logout button */}
      <button
        className="Logout flex items-center gap-3 px-4 py-3 rounded-lg mt-6 hover:bg-red-100 text-red-600"
        onClick={() => setIsOpen(true)}>
        <Logout />
        <p>Logout</p>
      </button>

      {/* Logout Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[100]">
        <Dialog.Backdrop className="fixed inset-0 bg-black bg-opacity-40" />

        <div className="fixed left-1/2 top-1/2 w-[90%] sm:w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6">
          <Dialog.Panel>
            <Dialog.Title className="text-center text-2xl font-bold mb-6">
              Are you sure you want to logout?
            </Dialog.Title>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="w-full py-3 bg-gray-200 rounded-lg text-gray-700 font-medium">
                Back To Dashboard
              </button>

              <button
                onClick={logOutUser}
                className="w-full py-3 bg-[#006A90] text-white rounded-lg font-medium">
                {loading ? "Logging out..." : "Continue To Logout"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default AdminSidebar;
