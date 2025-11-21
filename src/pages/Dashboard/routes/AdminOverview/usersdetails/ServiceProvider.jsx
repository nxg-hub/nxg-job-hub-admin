import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvider } from "../../../../../Redux/ServiceProviderSlice";
import avater from "../../../../../static/images/userIcon.png";
import ReactPaginate from "react-paginate";

export default function ServiceProvider({ searchTerm }) {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // match the same selector shape used earlier
  const { provider, loading, error, success } = useSelector(
    (state) => state.providerSlice
  );

  useEffect(() => {
    if (!success) {
      dispatch(fetchProvider({ page: 0, size: 1000000 }));
    }
  }, [success, dispatch]);

  // reset pagination when search changes (same behavior as others)
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  // Filter
  const filteredProvider = Array.isArray(provider)
    ? searchTerm
      ? provider.filter((p) =>
          [
            p.user?.firstName,
            p.user?.lastName,
            p.user?.email,
            p.serviceProvider?.mainSkills?.join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : provider
    : [];

  const pageCount = Math.ceil(filteredProvider.length / pageSize);

  const paginatedProvider = filteredProvider.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full overflow-x-auto pt-4">
      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <img src={Spinner} alt="loading" className="w-14 h-14" />
        </div>
      ) : (
        <>
          {/* Container (matches Talent/Employer) */}
          <div className="overflow-y-auto max-h-[72vh] rounded-xl shadow-md border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0 bg-gray-50 text-gray-700 z-10 shadow">
                <tr>
                  <th className="p-4 text-left font-medium">Profile</th>
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">Main Skills</th>
                  <th className="p-4 text-left font-medium">Location</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedProvider.map((item) => {
                  const sp = item.serviceProvider || {};
                  const user = item.user || {};

                  const avatarSrc =
                    sp.profilePicture || user.profilePicture || avater;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-all duration-150">
                      <td className="p-4">
                        <img
                          src={avatarSrc}
                          alt={`${user.firstName || ""} avatar`}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      </td>

                      <td className="p-4 font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </td>

                      <td className="p-4 text-gray-600 break-words max-w-[220px]">
                        {user.email || "—"}
                      </td>

                      <td className="p-4">
                        {sp.mainSkills && sp.mainSkills.length > 0 ? (
                          <span className="inline-flex flex-wrap gap-2">
                            {sp.mainSkills.slice(0, 3).map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">
                                {skill}
                              </span>
                            ))}
                            {sp.mainSkills.length > 3 && (
                              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                +{sp.mainSkills.length - 3}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>

                      <td className="p-4 text-gray-700">{sp.city || "—"}</td>

                      <td className="p-4">
                        <NavLink to={`userdetail/${user.id}/${user.userType}`}>
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

            {/* Empty state */}
            {paginatedProvider.length === 0 && (
              <div className="text-center py-20 text-gray-500 text-sm">
                No service providers found.
              </div>
            )}
          </div>

          {/* Pagination (match style used earlier) */}
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

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center mt-4">Error loading data</p>
          )}
        </>
      )}
    </div>
  );
}
