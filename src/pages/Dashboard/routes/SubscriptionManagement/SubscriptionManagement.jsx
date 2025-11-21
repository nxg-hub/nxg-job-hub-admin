// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSub } from "../../../../Redux/SubsriptionSlice";
// import Spinner from "../../../../static/icons/wheel.svg";
// import avater from "../../../../static/images/userIcon.png";

// const Subscription = () => {
//   const dispatch = useDispatch();
//   const subs = useSelector((state) => state.SubsriptionSlice.sub);
//   const loading = useSelector((state) => state.SubsriptionSlice.loading);
//   const error = useSelector((state) => state.SubsriptionSlice.error);
//   const success = useSelector((state) => state.SubsriptionSlice.success);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   useEffect(() => {
//     if (!success) {
//       dispatch(
//         fetchSub("/api/v1/admin/subscriptions?page=0&size=10000000&sort=string")
//       );
//     }
//   }, []);

//   const filteredSubs = subs.filter((s) => {
//     const matchesSearch =
//       s?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//       s?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
//       s.email.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus =
//       statusFilter === "" || s.subscriptionStatus === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="w-full m-auto px-4 md:px-8 py-6 h-screen overflow-y-scroll">
//       {loading ? (
//         <div className="flex justify-center items-center h-[80vh]">
//           <img
//             src={Spinner}
//             className="w-16 h-16 md:w-20 md:h-20 "
//             alt="loading"
//           />
//         </div>
//       ) : error ? (
//         <div className="flex justify-center items-center h-[80vh] text-xl text-red-500">
//           <p>Something went wrong. Check your internet connection.</p>
//         </div>
//       ) : (
//         <>
//           {/* Back Link */}
//           <Link
//             to="/dashboard"
//             className="flex items-center gap-2 text-gray-700 font-medium mb-4 hover:text-blue-600 transition">
//             <BsArrowLeft className="text-2xl" />
//             Back
//           </Link>

//           {/* Header + Filters */}
//           <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-3">
//             <h2 className="text-2xl font-semibold">User Subscriptions</h2>

//             <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
//               <input
//                 type="text"
//                 placeholder="Search by name or email"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
//                 <option value="">All Statuses</option>
//                 <option value="ACTIVE">ACTIVE</option>
//                 <option value="INACTIVE">INACTIVE</option>
//               </select>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
//                 <tr>
//                   <th className="px-6 py-3 text-left">User Details</th>
//                   <th className="px-6 py-3 text-left">Email</th>
//                   <th className="px-6 py-3 text-left">User Type</th>
//                   <th className="px-6 py-3 text-left">Plan</th>
//                   <th className="px-6 py-3 text-left">Status</th>
//                   <th className="px-6 py-3 text-left">Renewal Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSubs.length > 0 ? (
//                   filteredSubs.map((s, i) => (
//                     <tr
//                       key={i}
//                       className="border-b hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 flex items-center gap-3">
//                         <img
//                           src={s.user.profilePicture || avater}
//                           alt="user"
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <span className="font-semibold">{`${s?.user?.firstName} ${s?.user?.lastName}`}</span>
//                       </td>
//                       <td className="px-6 py-4">{s.email}</td>
//                       <td className="px-6 py-4">{s.user.userType}</td>
//                       <td className="px-6 py-4">{s.planType}</td>
//                       <td
//                         className={`px-6 py-4 font-semibold ${
//                           s.subscriptionStatus === "ACTIVE"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}>
//                         {s.subscriptionStatus || "N/A"}
//                       </td>
//                       <td className="px-6 py-4">
//                         {s.subscriptionDues || "N/A"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="text-center py-6 text-gray-500 font-medium">
//                       No subscriptions found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Subscription;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../Redux/SubsriptionSlice";
import Spinner from "../../../../static/icons/wheel.svg";
import avater from "../../../../static/images/userIcon.png";

const Subscription = () => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const loading = useSelector((state) => state.SubsriptionSlice.loading);
  const error = useSelector((state) => state.SubsriptionSlice.error);
  const success = useSelector((state) => state.SubsriptionSlice.success);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!success) {
      dispatch(
        fetchSub("/api/v1/admin/subscriptions?page=0&size=10000000&sort=string")
      );
    }
  }, [success, dispatch]);

  const filteredSubs = subs.filter((s) => {
    const matchesSearch =
      s?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      s?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || s.subscriptionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full m-auto px-4 md:px-8 py-6 h-screen overflow-y-auto">
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <img src={Spinner} className="w-16 h-16 " alt="loading" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[75vh] text-xl text-red-500">
          Something went wrong. Check your connection.
        </div>
      ) : (
        <>
          {/* Back Link */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-700 font-medium mb-5 hover:text-blue-600 transition">
            <BsArrowLeft className="text-xl" />
            Back
          </Link>

          {/* Header + Filters */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Subscriptions
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
            <table className="w-full text-sm">
              {/* Sticky Header */}
              <thead className="bg-gray-50 text-gray-700 sticky top-0 z-10 shadow">
                <tr>
                  <th className="p-4 text-left font-medium">User Details</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">User Type</th>
                  <th className="p-4 text-left font-medium">Plan</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Renewal Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredSubs.length > 0 ? (
                  filteredSubs.map((s, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition-all duration-150">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={s.user.profilePicture || avater}
                          alt="user"
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        <span className="font-semibold text-gray-800">
                          {`${s?.user?.firstName} ${s?.user?.lastName}`}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">{s.email}</td>
                      <td className="p-4 text-gray-700">{s.user.userType}</td>
                      <td className="p-4 text-gray-700">{s.planType}</td>

                      <td
                        className={`p-4 font-semibold ${
                          s.subscriptionStatus === "ACTIVE"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        {s.subscriptionStatus || "N/A"}
                      </td>

                      <td className="p-4 text-gray-700">
                        {s.subscriptionDues || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-500 font-medium">
                      No subscriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscription;
