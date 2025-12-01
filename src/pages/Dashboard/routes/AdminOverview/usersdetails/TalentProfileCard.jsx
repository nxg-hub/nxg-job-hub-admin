import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../../../../Redux/TalentSlice";
import avater from "../../../../../static/images/userIcon.png";
import ReactPaginate from "react-paginate";

export default function TalentProfileCard({ searchTerm }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const {
    success,
    talents: talent,
    loading,
    error,
  } = useSelector((state) => state.TalentSlice);

  // Search filter
  const filteredTalent = Array.isArray(talent)
    ? searchTerm
      ? talent.filter((t) => {
          const tech = t.techTalentUser || {};
          const account = t.user || {};

          const fields = [
            tech.jobInterest,
            account.firstName,
            account.lastName,
            account.email,
          ];

          return fields.some((f) =>
            f?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      : talent
    : [];

  const pageCount = Math.ceil(filteredTalent.length / pageSize);
  const paginatedTalent = filteredTalent.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  useEffect(() => {
    if (!success) dispatch(fetchTalent({ page: 0, size: 1000000 }));
  }, []);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full overflow-x-auto pt-4">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <img src={Spinner} alt="Loading" className="w-14 h-14" />
        </div>
      )}

      {!loading && (
        <>
          {/* Table Container */}
          <div className="overflow-y-auto max-h-[72vh] rounded-xl shadow-md border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0 bg-gray-50 text-gray-700  shadow">
                <tr>
                  <th className="p-4 text-left font-medium">Profile</th>
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">Job Interest</th>
                  <th className="p-4 text-left font-medium">Location</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedTalent.map((user) => {
                  const tech = user.techTalentUser || {};
                  const account = user.user || {};

                  return (
                    <tr
                      key={account.id}
                      className="hover:bg-gray-50 transition-all duration-150">
                      <td className="p-4">
                        <img
                          src={
                            tech.profilePicture ||
                            account.profilePicture ||
                            avater
                          }
                          className="w-12 h-12 rounded-full object-cover border"
                          alt={account.name}
                        />
                      </td>

                      <td className="p-4 font-semibold text-gray-800">
                        {account.firstName} {account.lastName}
                      </td>

                      <td className="p-4 text-gray-600 max-w-[220px] break-all">
                        {tech.email || account.email}
                      </td>

                      <td className="p-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">
                          {tech.jobInterest || "N/A"}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">
                        {tech.residentialAddress || "N/A"}
                      </td>

                      <td className="p-4">
                        <NavLink
                          to={`userdetail/${account.id}/${account.userType}`}>
                          <button className="px-4 py-2 bg-[#2596be] text-white rounded-lg hover:bg-[#1d7c9d] transition shadow-md">
                            View Details
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {paginatedTalent.length === 0 && (
              <div className="text-center py-20 text-gray-500 text-sm">
                No profiles found.
              </div>
            )}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-6 flex justify-center">
              <ReactPaginate
                previousLabel="← Prev"
                nextLabel="Next →"
                pageCount={pageCount}
                onPageChange={handlePageClick}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                containerClassName="flex items-center space-x-2"
                pageClassName="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                previousClassName="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                nextClassName="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                activeClassName="!bg-[#2596be] !text-white border-[#2596be]"
                breakClassName="px-3 py-1 text-gray-500"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-center mt-4">Error loading data</p>
          )}
        </>
      )}
    </div>
  );
}
