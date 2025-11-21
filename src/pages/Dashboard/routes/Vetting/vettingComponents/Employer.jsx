// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../../../../../static/icons/wheel.svg";
// import { Link } from "react-router-dom";
// import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
// import avater from "../../../../../static/images/userIcon.png";

// const Employer = ({ handleReview }) => {
//   const dispatch = useDispatch();
//   const employer = useSelector((state) => state.EmployerSlice.employer);
//   const loading = useSelector((state) => state.EmployerSlice.loading);
//   const error = useSelector((state) => state.EmployerSlice.error);
//   const success = useSelector((state) => state.EmployerSlice.success);
//   // console.log(success);

//   // useEffect(() => {
//   //   if (success) {
//   //     return;
//   //   }
//   //   //fetching All Empoyers
//   //   dispatch(fetchEmployer("/api/v1/admin/employer?page=0&size=1000"));
//   // }, []);
//   return (
//     <>
//       <div className="tobe-vetted  overflow-y-scroll !h-[350px]">
//         {loading ? (
//           <img
//             src={Spinner}
//             className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
//             alt="loading"
//           />
//         ) : !loading && error ? (
//           <div className="w-[80%] m-auto mt-[300px] text-xl">
//             <h2>Something went wrong. Check internet connecton</h2>
//           </div>
//         ) : (
//           employer
//             .filter((user) => {
//               return user.user.profileVerified === false;
//             })
//             .map((user) => (
//               <ul className="shadow-sm shadow-[#00000040]" key={user.user.id}>
//                 <div className="w-[80%] flex items-center">
//                   <img
//                     className="w-[64px] h-[64px] rounded-full"
//                     src={
//                       //if no profice picture, display default avatar
//                       user.user.profilePicture
//                         ? user.user.profilePicture
//                         : avater
//                     }
//                     alt={user.user.userName}></img>
//                   <li className="text-[16px] font-normal space-y-[-15px]">
//                     <h3 className="pt-[14px]">{user.user.name}</h3>
//                     <h3 className="pt-[14px]  text-sm capitalize font-bold">
//                       {user.employer.companyName}
//                     </h3>
//                   </li>
//                 </div>
//                 <div className="vet-btns">
//                   <Link
//                     to={`../review-employer/${user.user.id}`}
//                     onClick={() => handleReview(user.user.id)}>
//                     <button>Review</button>
//                   </Link>
//                 </div>
//               </ul>
//             ))
//         )}
//       </div>
//       <div className="vetted overflow-y-scroll">
//         {!loading &&
//           employer
//             .filter((user) => {
//               return user.user.profileVerified === true;
//             })
//             .map((user) => (
//               <ul className="shadow-sm shadow-[#00000040]" key={user.user.id}>
//                 <div className="w-[80%] flex ">
//                   <img
//                     className="w-[64px] h-[64px] rounded-full"
//                     src={
//                       //if no profice picture, display default avatar
//                       user.user.profilePicture
//                         ? user.user.profilePicture
//                         : avater
//                     }
//                     alt={user.user.name}></img>
//                   <li className="text-[16px] font-normal space-y-[-15px]">
//                     <h3 className="pt-[14px]">{user.user.name}</h3>
//                     <h3 className="pt-[14px]  text-sm capitalize font-bold">
//                       {user.employer.companyName}
//                     </h3>
//                   </li>
//                 </div>
//                 <p className="pr-[5%] lg:pr-0">Vetted</p>
//               </ul>
//             ))}
//       </div>
//     </>
//   );
// };

// export default Employer;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../../../../../static/icons/wheel.svg";
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
// import avater from "../../../../../static/images/userIcon.png";

// const Employers = ({ handleReview, searchTerm }) => {
//   const dispatch = useDispatch();
//   const employers = useSelector((state) => state.EmployerSlice.employer) || [];
//   const loading = useSelector((state) => state.EmployerSlice.loading);
//   const error = useSelector((state) => state.EmployerSlice.error);
//   const success = useSelector((state) => state.EmployerSlice.success);

//   const [toBeVettedPage, setToBeVettedPage] = useState(0);
//   const [vettedPage, setVettedPage] = useState(0);
//   const pageSize = 5;

//   useEffect(() => {
//     if (!success) dispatch(fetchEmployer({ page: 0, size: 10000 }));
//   }, [success]);

//   const toBeVetted = employers?.filter((u) => !u.user.profileVerified);
//   const vetted = employers?.filter((u) => u.user.profileVerified);

//   const filteredToBeVetted = toBeVetted.filter((u) => {
//     const fullName = u.user.name?.toLowerCase() || "";
//     const email = u.user.email?.toLowerCase() || "";
//     const term = searchTerm.toLowerCase();
//     const companyName = u.employer.companyName?.toLowerCase() || "";

//     return (
//       fullName.includes(term) ||
//       email.includes(term) ||
//       companyName.includes(term)
//     );
//   });

//   const filteredVetted = vetted.filter((u) => {
//     const fullName = u.user.name?.toLowerCase() || "";
//     const email = u.user.email?.toLowerCase() || "";
//     const companyName = u.employer.companyName?.toLowerCase() || "";
//     const term = searchTerm.toLowerCase();

//     return (
//       fullName.includes(term) ||
//       email.includes(term) ||
//       companyName.includes(term)
//     );
//   });
//   const renderEmployerCard = (user, isVetted = false) => (
//     <div
//       key={user.user.id}
//       className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-3 hover:shadow-lg transition">
//       <div className="flex items-center gap-4">
//         <img
//           className="w-16 h-16 rounded-full object-cover"
//           src={user.user.profilePicture || avater}
//           alt={user.user.name}
//         />
//         <div>
//           <h3 className="text-lg font-semibold">{user.user.name}</h3>
//           <p className="text-sm text-gray-500">
//             {user.employer?.companyName || "No Company Name"}
//           </p>
//         </div>
//       </div>
//       <div>
//         {isVetted ? (
//           <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full">
//             Vetted
//           </span>
//         ) : (
//           <Link to={`../review-employer/${user.user.id}`}>
//             <button
//               onClick={() => handleReview(user.user.id)}
//               className="px-4 py-2 bg-[#2596be] text-white rounded-lg hover:bg-blue-700 transition">
//               Review
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );

//   const pageCount = (list) => Math.ceil(list.length / pageSize);
//   const paginate = (list, page) =>
//     list.slice(page * pageSize, (page + 1) * pageSize);

//   return (
//     <div className="flex flex-col md:flex-row gap-6 h-screen overflow-y-scroll">
//       {/* To Be Vetted */}
//       <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-inner max-h-[500px] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">To Be Vetted</h2>
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <img src={Spinner} alt="loading" className="w-20 h-20" />
//           </div>
//         ) : error ? (
//           <p className="text-red-500 text-center">
//             Something went wrong. Check internet connection
//           </p>
//         ) : (
//           <>
//             {paginate(filteredToBeVetted, toBeVettedPage).map((user) =>
//               renderEmployerCard(user)
//             )}
//             {filteredToBeVetted.length > pageSize && (
//               <ReactPaginate
//                 previousLabel={"<"}
//                 nextLabel={">"}
//                 pageCount={pageCount(filteredToBeVetted)}
//                 onPageChange={({ selected }) => setToBeVettedPage(selected)}
//                 containerClassName="flex justify-center gap-2 mt-3"
//                 pageClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
//                 activeClassName="bg-blue-600 text-white"
//               />
//             )}
//           </>
//         )}
//       </div>

//       {/* Vetted */}
//       <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-inner max-h-[500px] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Vetted</h2>
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <img src={Spinner} alt="loading" className="w-20 h-20" />
//           </div>
//         ) : (
//           <>
//             {paginate(filteredVetted, vettedPage).map((user) =>
//               renderEmployerCard(user, true)
//             )}
//             {filteredVetted.length > pageSize && (
//               <ReactPaginate
//                 previousLabel={"<"}
//                 nextLabel={">"}
//                 pageCount={pageCount(filteredVetted)}
//                 onPageChange={({ selected }) => setVettedPage(selected)}
//                 containerClassName="flex justify-center gap-2 mt-3"
//                 pageClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
//                 activeClassName="bg-green-600 text-white"
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Employers;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
import avater from "../../../../../static/images/userIcon.png";

const Employers = ({ handleReview, searchTerm }) => {
  const dispatch = useDispatch();
  const employers = useSelector((state) => state.EmployerSlice.employer) || [];
  const loading = useSelector((state) => state.EmployerSlice.loading);
  const error = useSelector((state) => state.EmployerSlice.error);
  const success = useSelector((state) => state.EmployerSlice.success);

  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    if (!success) dispatch(fetchEmployer({ page: 0, size: 10000 }));
  }, [success]);

  // -------------------------------------
  // FILTER EMPLOYERS BY SEARCH + STATUS
  // -------------------------------------
  const filtered = employers
    .filter((u) => {
      const fullName = u?.user?.name?.toLowerCase() || "";
      const email = u?.user?.email?.toLowerCase() || "";
      const company = u?.employer?.companyName?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        fullName.includes(term) ||
        email.includes(term) ||
        company.includes(term);

      const isVetted = u.user.profileVerified;

      const matchesStatus =
        statusFilter === "vetted"
          ? isVetted
          : statusFilter === "unvetted"
          ? !isVetted
          : true; // all

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const nameA = a.user?.name?.toLowerCase() || "";
      const nameB = b.user?.name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    });

  const paginated = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg h-full w-full overflow-auto">
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          className="border px-3 py-2 rounded-lg w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Employers</option>
          <option value="vetted">Vetted</option>
          <option value="unvetted">Not Vetted</option>
        </select>
      </div>

      {/* ------------------------------ */}
      {/* TABLE */}
      {/* ------------------------------ */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-4">Employer</th>
              <th className="p-4">Company</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <img
                    src={Spinner}
                    alt="loading"
                    className="w-20 h-20 mx-auto"
                  />
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-red-500">
                  Something went wrong. Check internet connection.
                </td>
              </tr>
            )}

            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No matching results
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map((u) => {
                const isVetted = u.user.profileVerified;
                const avatar = u.user.profilePicture || avater;

                return (
                  <tr
                    key={u.user.id}
                    className="border-t hover:bg-gray-50 transition">
                    {/* EMPLOYER */}
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={avatar}
                        alt={u.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {u.employer?.companyName || "No Company Name"}
                        </p>
                      </div>
                    </td>

                    {/* COMPANY */}
                    <td className="p-4 text-gray-700">
                      {u.employer?.companyName || "No Company Name"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-700 max-w-xs break-words truncate">
                      {u.user.email || "N/A"}
                    </td>

                    {/* STATUS BADGE */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isVetted
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {isVetted ? "Vetted" : "Not Vetted"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="p-4 text-right">
                      {!isVetted ? (
                        <Link to={`../review-employer/${u.user.id}`}>
                          <button
                            onClick={() => handleReview(u.user.id)}
                            className="px-4 py-2 text-sm bg-[#2596be] text-white rounded-lg  transition">
                            Review
                          </button>
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* ------------------------------ */}
      {/* PAGINATION */}
      {/* ------------------------------ */}
      {filtered.length > pageSize && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filtered.length / pageSize)}
          onPageChange={({ selected }) => setPage(selected)}
          forcePage={page}
          containerClassName="flex items-center justify-center gap-2 mt-4"
          pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
          previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
          nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
          activeClassName="bg-blue-600 text-white"
        />
      )}
    </div>
  );
};

export default Employers;
