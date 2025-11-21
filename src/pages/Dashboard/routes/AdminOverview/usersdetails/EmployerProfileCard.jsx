// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import Spinner from "../../../../../static/icons/wheel.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
// import avater from "../../../../../static/images/userIcon.png";

// export default function EmployerProfileCard({ searchTerm }) {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageSize = 10; // items per page

//   const employer = useSelector((state) => state.EmployerSlice.employer);
//   const loading = useSelector((state) => state.EmployerSlice.loading);
//   const error = useSelector((state) => state.EmployerSlice.error);
//   const success = useSelector((state) => state.EmployerSlice.success);

//   useEffect(() => {
//     if (!success) dispatch(fetchEmployer({ page: 0, size: 10000 }));
//   }, [success]);

//   // Filter employers based on searchTerm
//   const filteredEmployer = Array.isArray(employer)
//     ? searchTerm
//       ? employer.filter(
//           (t) =>
//             t.employer?.email
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             t.employer?.companyName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             t.user?.firstName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             t.user?.lastName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             t.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : employer
//     : [];

//   const pageCount = Math.ceil(filteredEmployer.length / pageSize);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const paginatedEmployer = filteredEmployer.slice(
//     currentPage * pageSize,
//     currentPage * pageSize + pageSize
//   );

//   return (
//     <div className="w-full overflow-x-auto py-4 relative ">
//       {loading ? (
//         <div className="flex justify-center mt-20">
//           <img src={Spinner} alt="loading" className="w-16 h-16" />
//         </div>
//       ) : (
//         <>
//           <div className="overflow-y-auto max-h-[75vh]">
//             <table className="min-w-full border-collapse bg-white">
//               <thead className="sticky top-0 bg-gray-100 text-sm text-gray-700">
//                 <tr>
//                   <th className="p-3 text-left">Profile</th>
//                   <th className="p-3 text-left">Company Name</th>
//                   <th className="p-3 text-left">Email</th>
//                   <th className="p-3 text-left">Company Location</th>
//                   <th className="p-3 text-left">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="bg-white divide-y divide-gray-100">
//                 {paginatedEmployer.map((item) => {
//                   const emp = item.employer;
//                   const user = item.user;
//                   const profileImg =
//                     emp.profilePicture ||
//                     user.profilePicture ||
//                     emp.companyLogo ||
//                     avater;

//                   return (
//                     <tr
//                       key={user.id}
//                       className="hover:bg-gray-50 transition duration-150">
//                       <td className="p-3">
//                         <img
//                           src={profileImg}
//                           alt={user.firstName}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                       </td>
//                       <td className="p-3 font-semibold">
//                         {emp.companyName || "—"}
//                       </td>
//                       <td className="p-3 break-words max-w-[200px]">
//                         {emp.email || "—"}
//                       </td>
//                       <td className="p-3">{emp.companyAddress || "—"}</td>
//                       <td className="p-3">
//                         <NavLink to={`userdetail/${user.id}/${user.userType}`}>
//                           <button className="px-4 py-2 text-sm bg-[#2596be] text-white rounded-lg hover:bg-blue-700 transition">
//                             Details
//                           </button>
//                         </NavLink>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {!loading && error && (
//             <p className="text-red-500 text-center mt-4">Error loading data</p>
//           )}

//           {/* React Paginate */}
//           {pageCount > 1 && (
//             <div className="flex justify-center mt-6">
//               <ReactPaginate
//                 previousLabel={"Previous"}
//                 nextLabel={"Next"}
//                 breakLabel={"..."}
//                 pageCount={pageCount}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={3}
//                 onPageChange={handlePageClick}
//                 containerClassName={"flex space-x-2"}
//                 pageClassName={
//                   "px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
//                 }
//                 activeClassName={"bg-[#2596be] text-white"}
//                 previousClassName={
//                   "px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
//                 }
//                 nextClassName={
//                   "px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
//                 }
//                 disabledClassName={"opacity-50 cursor-not-allowed"}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
import avater from "../../../../../static/images/userIcon.png";

export default function EmployerProfileCard({ searchTerm }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { employer, loading, error, success } = useSelector(
    (state) => state.EmployerSlice
  );

  useEffect(() => {
    if (!success) dispatch(fetchEmployer({ page: 0, size: 10000 }));
  }, [success]);

  // Filter logic
  const filteredEmployer = Array.isArray(employer)
    ? searchTerm
      ? employer.filter((t) => {
          const emp = t.employer || {};
          const user = t.user || {};
          const fields = [
            emp.email,
            emp.companyName,
            user.firstName,
            user.lastName,
            user.email,
          ];

          return fields.some((f) =>
            f?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      : employer
    : [];

  const pageCount = Math.ceil(filteredEmployer.length / pageSize);

  const paginatedEmployer = filteredEmployer.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full overflow-x-auto py-4">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-20">
          <img src={Spinner} alt="loading" className="w-14 h-14" />
        </div>
      )}

      {!loading && (
        <>
          {/* Table container */}
          <div className="overflow-y-auto max-h-[72vh] rounded-xl shadow-md border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0 bg-gray-50 text-gray-700 z-10 shadow">
                <tr>
                  <th className="p-4 text-left font-medium">Profile</th>
                  <th className="p-4 text-left font-medium">Company Name</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">
                    Company Location
                  </th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedEmployer.map((item) => {
                  const emp = item.employer || {};
                  const user = item.user || {};

                  const profileImg =
                    emp.profilePicture ||
                    user.profilePicture ||
                    emp.companyLogo ||
                    avater;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-all duration-150">
                      <td className="p-4">
                        <img
                          src={profileImg}
                          alt={emp.companyName}
                          className="w-12 h-12 rounded-full border object-cover"
                        />
                      </td>

                      <td className="p-4 font-semibold text-gray-800">
                        {emp.companyName || "—"}
                      </td>

                      <td className="p-4 text-gray-600 break-words max-w-[220px]">
                        {emp.email || "—"}
                      </td>

                      <td className="p-4 text-gray-700">
                        {emp.companyAddress || "—"}
                      </td>

                      <td className="p-4">
                        <NavLink to={`userdetail/${user.id}/${user.userType}`}>
                          <button className="px-4 py-2 bg-[#2596be] text-white rounded-lg hover:bg-[#1d7c9d] transition shadow-md">
                            Details
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {paginatedEmployer.length === 0 && (
              <div className="text-center py-20 text-gray-500 text-sm">
                No employers found.
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-center mt-4">Error loading data</p>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-6">
              <ReactPaginate
                previousLabel="← Prev"
                nextLabel="Next →"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="flex items-center space-x-2"
                pageClassName="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                previousClassName="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                nextClassName="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                activeClassName="!bg-[#2596be] !text-white border-[#2596be]"
                breakClassName="px-3 py-1 text-gray-500"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
