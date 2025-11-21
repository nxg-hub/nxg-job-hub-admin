import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { fetchAccHistory } from "../../../../../Redux/AccountHistorySlice";
import moment from "moment";

const AccountApprovalHistory = () => {
  const dispatch = useDispatch();
  const { history, loading, error, success } = useSelector(
    (state) => state.AccountHistorySlice
  );

  // Filters
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("All");
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!success) {
      dispatch(
        fetchAccHistory(
          "/api/v1/admin/approval-history/employer?page=0&size=100000"
        )
      );
    }
  }, []);

  const formatDate = (data) => {
    const date =
      data.dateOfApproval ||
      data.dateOfDisapproval ||
      data.dateOfJobSuspension ||
      data.dateOfProfileSuspension ||
      data.dateOfJobReactivation;

    return date ? moment(date).format("DD/MM/YYYY") : "—";
  };

  const getStatus = (data) => {
    if (data.dateOfApproval) return "Approved";
    if (data.dateOfDisapproval) return "Disapproved";
    if (data.dateOfJobSuspension || data.dateOfProfileSuspension)
      return "Suspended";
    if (data.dateOfJobReactivation) return "Reactivated";
    return "—";
  };

  const statusColor = {
    Approved: "bg-green-100 text-green-700",
    Disapproved: "bg-red-100 text-red-700",
    Suspended: "bg-yellow-100 text-yellow-700",
    Reactivated: "bg-blue-100 text-blue-700",
    "—": "bg-gray-100 text-gray-500",
  };

  // 💡 FILTERED HISTORY (MEMOIZED)
  const filteredHistory = useMemo(() => {
    return history
      .filter((item) =>
        userType === "All" ? true : item.userType === userType
      )
      .filter((item) => (status === "All" ? true : getStatus(item) === status))
      .filter((item) =>
        search === ""
          ? true
          : item.employerName?.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) => {
        const date =
          item.dateOfApproval ||
          item.dateOfDisapproval ||
          item.dateOfJobSuspension ||
          item.dateOfProfileSuspension ||
          item.dateOfJobReactivation;

        if (!date) return false;

        const d = moment(date);

        if (startDate && d.isBefore(moment(startDate), "day")) return false;
        if (endDate && d.isAfter(moment(endDate), "day")) return false;

        return true;
      });
  }, [history, search, userType, status, startDate, endDate]);

  return (
    <div className="w-full p-4">
      {/* 🔍 FILTER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 rounded-xl shadow  w-full">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded-lg p-2 text-sm "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* User Type */}
        <select
          className="border rounded-lg p-2 text-sm md:w-[200px]"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}>
          <option value="All">All User Types</option>
          <option value="EMPLOYER">Employer</option>
          <option value="TECHTALENT">Talent</option>
          {/* <option value="ADMIN">Admin</option> */}
        </select>

        {/* Status */}
        <select
          className="border rounded-lg p-2 text-sm md:w-[200px] relative md:right-[20%]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Disapproved">Disapproved</option>
          <option value="Suspended">Suspended</option>
          <option value="Reactivated">Reactivated</option>
        </select>

        {/* Date Range */}
        <div className="flex  items-center gap-2 relative right-2 md:right-[30%]">
          <input
            type="date"
            className="border rounded-lg p-2 text-sm w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-gray-500">—</span>
          <input
            type="date"
            className="border rounded-lg p-2 text-sm w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center mt-24">
          <img src={Spinner} className="w-16 h-16 " alt="loading" />
        </div>
      ) : error ? (
        <div className="w-full text-center mt-20 text-lg text-red-600">
          Something went wrong. Check your internet connection.
        </div>
      ) : (
        <div className="relative overflow-auto h-[80vh] border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="sticky top-0 bg-gray-100 text-gray-800 text-xs uppercase shadow-sm">
              <tr>
                <th className="px-6 py-3">User Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Approval Officer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Disapproval Reason</th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.userType}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColor[getStatus(item)]
                      }`}>
                      {getStatus(item)}
                    </span>
                  </td>

                  <td className="px-6 py-4">{item.employerName}</td>

                  <td className="px-6 py-4">{item.approvalOfficerName}</td>

                  <td className="px-6 py-4">{formatDate(item)}</td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    <span
                      title={
                        item.disapprovalReason ||
                        item.reasonForProfileSuspension
                      }>
                      {item.disapprovalReason ||
                        item.reasonForProfileSuspension ||
                        "—"}
                    </span>
                  </td>
                </tr>
              ))}

              {!filteredHistory.length && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 text-sm">
                    No matching records found.
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

export default AccountApprovalHistory;
