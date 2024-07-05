import React, { useState } from "react";
import Logo from "../../../static/images/nxg-logo.png";
import { PiUserCircle, PiShieldCheck, PiFileTextDuotone } from "react-icons/pi";
import { Health, Job, Logout, Wallet } from "../../../utils/SidebarIcons";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import "../adminstyle.scss";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const menuItem = [
    {
      path: "dashboard",
      name: "User Management",
      icon: <PiUserCircle />,
    },
    {
      path: "jobmanagement",
      name: "Job Management",
      icon: <Job />,
    },
    {
      path: "vetting",
      name: " Vetting Oversight",
      icon: <PiShieldCheck />,
    },
    {
      path: "payments",
      name: "Payment & Transactions",
      icon: <PiFileTextDuotone />,
    },
    {
      path: "health",
      name: "System Health",
      icon: <Health />,
    },
    {
      path: "subscriptionManagement",
      name: "Subscription Management",
      icon: <Wallet />,
    },
    {
      path: "postedJobs",
      name: "Posted Jobs",
      icon: <Job />,
    },
  ];

  const moveToDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear user authentication information
    localStorage.removeItem("NXGJOBHUBLOGINKEYV1");

    // Navigate to the login page
    navigate("/");
  };

  return (
    <div className="sidebar-main">
      <div className="side-logo">
        <img src={Logo} alt="Nxg-logo" />
      </div>
      <div className="menu-icons-container">
        {menuItem.map((item, index) => (
          <NavLink end to={item.path} key={index} className="dashboardItem">
            <div>{item.icon}</div>
            <p>{item.name}</p>
          </NavLink>
        ))}
      </div>
      <NavLink className="Logout" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <Logout />
        </div>
        <p> Logout </p>
      </NavLink>
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {isOpen && (
        <Dialog
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[60%] flex justify-center items-center bg-white border-none rounded-[24px] py-8 px-4 z-[100]"
          open={isOpen}
          onClose={() => setIsOpen(false)}>
          <Dialog.Backdrop className="fixed inset-0 bg-black/30" />
          <div className="w-[100%]">
            <Dialog.Panel>
              <Dialog.Title style={{ textAlign: "center" }}>
                <p className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-extrabold text-center">
                  Are you sure you want to logout?
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    margin: " auto",
                  }}>
                  <button
                    onClick={moveToDashboard}
                    className="w-[80%]  p-[8px] bg-[#006A90] border-none rounded-[10px] text-white text-[14px] sm:text-[24px] font-[500px] my-10 ">
                    Back To Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-[80%] p-[8px] bg-[#006A90] border-none rounded-[10px] text-white text-[14px] sm:text-[24px] font-[500px]">
                    Continue To Logout
                  </button>
                </div>
              </Dialog.Title>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default AdminSidebar;
