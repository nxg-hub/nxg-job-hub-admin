import React, { useEffect } from "react";
import Spinner from "../../../../../static/icons/wheel.svg";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewEmployer } from "../../../../../Redux/NewUserSlice";

const NewEmployers = () => {
  const dispatch = useDispatch();
  const {
    newEmployers: employer,
    loading,
    error,
    employerSuccess: success,
  } = useSelector((state) => state.newUsersSlice);

  useEffect(() => {
    if (!success) {
      dispatch(fetchNewEmployer({ page: 0, size: 1000000 }));
    }
  }, []);

  return (
    <div className="w-full p-4">
      {/* ---------------- LOADING ---------------- */}
      {loading && (
        <div className="flex justify-center items-center h-[300px]">
          <img src={Spinner} className="w-16 h-16" alt="loader" />
        </div>
      )}

      {/* ---------------- ERROR ---------------- */}
      {!loading && error && (
        <div className="text-center text-red-600 mt-10 text-lg font-medium">
          Something went wrong. Check your internet connection.
        </div>
      )}

      {/* ---------------- DATA TABLE ---------------- */}
      {!loading && !error && (
        <div className="overflow-x-auto border rounded-xl shadow-sm max-h-[75vh]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4">Employer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Date Joined</th>
              </tr>
            </thead>

            <tbody>
              {employer?.length > 0 ? (
                employer.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-gray-50 transition">
                    {/* NAME */}
                    <td className="p-4 font-medium text-gray-900">
                      {user.employerName || "N/A"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-700 max-w-[220px]">
                      <span className="truncate inline-block w-full">
                        {user.email || "N/A"}
                      </span>
                    </td>

                    {/* DATE JOINED */}
                    <td className="p-4 text-gray-700">
                      {user.dateJoined
                        ? moment(user.dateJoined).format("DD/MM/YYYY HH:mm")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-500 text-sm">
                    No new employers at the moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewEmployers;
