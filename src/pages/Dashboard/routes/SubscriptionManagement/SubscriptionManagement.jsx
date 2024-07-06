import React from "react";
import sarah from "../../../../static/images/admin-sarah.png";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const SubscriptionManagement = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currentDate = `${day}/${month}/${year}`;

  const sub = [
    {
      id: 1,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Expired",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 2,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 3,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Expired",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 4,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 5,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 6,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Expired",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 7,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 8,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Expired",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 9,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 10,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 11,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "active",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 12,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Expired",
      date: currentDate,
      pic: sarah,
    },
    {
      id: 13,
      userDetails: "Ayo dotun",
      email: "Ayodotun@gamil.com",
      userType: "Tech Talent",
      plan: "Silver",
      status: "Expired",
      date: currentDate,
      pic: sarah,
    },
  ];
  return (
    <div className="w-full">
      <Link
        to={"/dashboard"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: "400",
          color: "#000",
          margin: "0 0 1rem 1rem",
          paddingTop: ".5rem",
        }}>
        <BsArrowLeft style={{ fontSize: "26px" }} />
        <span>Back</span>
      </Link>

      <div className="relative overflow-x-auto overflow-y-scroll h-[90vh] w-[90%] m-auto border rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Details
              </th>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                User Type
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Renewal Date
              </th>
            </tr>
          </thead>
          <tbody>
            {sub.map((s, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center gap-3 font-bold">
                    <img className="w-[40px]" src={s.pic} alt="pic" />
                    {s.userDetails}
                  </div>
                </th>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">{s.userType}</td>
                <td className="px-6 py-4">{s.plan}</td>
                <td
                  className={
                    s.status === "Active"
                      ? "text-green-500 px-6 py-4"
                      : "text-red-500 px-6 py-4"
                  }>
                  {s.status}
                </td>
                <td className="px-6 py-4">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
