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
                        <p className="font-medium text-sm">
                          {u.employer?.companyName || "No Company Name"}
                        </p>
                      </div>
                    </td>

                    {/* COMPANY */}
                    <td className="p-4 text-gray-700 text-sm">
                      {u.employer?.companyName || "No Company Name"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-700 text-sm max-w-xs break-words truncate">
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
