import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { fetchJobHistory } from "../../../../../Redux/JobHistorySlice";
import moment from "moment";

const JobApprovalHistory = () => {
  const dispatch = useDispatch();
  const { history, loading, error, success } = useSelector(
    (state) => state.JobHistorySlice
  );
  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!success) {
      dispatch(
        fetchJobHistory(
          "/api/v1/admin/job-application-approval-history/all?page=0&size=1000000"
        )
      );
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
      case "DISAPPROVED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Extract the date from item based on available fields
  const getActionDate = (item) => {
    return item.timestamp || null;
  };

  // ⭐ FILTERED DATA (fast + memoized)
  const filteredHistory = useMemo(() => {
    return history
      .filter((item) =>
        search === ""
          ? true
          : `${item.jobId} ${item.techTalentName} ${item.employerName}`
              .toLowerCase()
              .includes(search.toLowerCase())
      )
      .filter((item) => {
        if (status === "All") return true;
        return item.approvalStatus?.toUpperCase() === status.toUpperCase();
      })
      .filter((item) => {
        const rawDate = getActionDate(item);

        if (!rawDate) return true;

        const d = moment(rawDate);
        if (startDate && d.isBefore(moment(startDate), "day")) return false;
        if (endDate && d.isAfter(moment(endDate), "day")) return false;

        return true;
      });
  }, [history, search, status, startDate, endDate]);
  return (
    <div className="w-full p-4">
      {/* 🔍 FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 bg-white p-4 rounded-xl shadow">
        {/* Search */}
        <input
          type="text"
          placeholder="Search job ID, talent, employer..."
          className="border rounded-lg p-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="border rounded-lg p-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
          <option value="DISAPPROVED">Disapproved</option>
        </select>

        {/* Date Range */}
        <input
          type="date"
          className="border rounded-lg p-2 text-sm"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border rounded-lg p-2 text-sm"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-24">
          <img src={Spinner} className="w-16 h-16" alt="loading" />
        </div>
      ) : error ? (
        <div className="w-full text-center mt-20 text-lg text-red-600">
          Something went wrong. Check your internet connection.
        </div>
      ) : (
        <div className="relative overflow-auto h-[70vh] border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="sticky top-0 bg-gray-100 text-gray-800 text-xs uppercase shadow-sm">
              <tr>
                <th className="px-6 py-3">Job ID</th>
                <th className="px-6 py-3">Date</th>
                <th className="hidden md:table-cell px-6 py-3">Employer ID</th>
                <th className="px-6 py-3">Employer Name</th>
                <th className="px-6 py-3">Approval Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.jobId}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </td>

                  <td className="hidden md:table-cell px-6 py-4">
                    {item.employerId}
                  </td>

                  <td className="px-6 py-4">{item.employerName}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.approvalStatus
                      )}`}>
                      {item.approvalStatus || "—"}
                    </span>
                  </td>
                </tr>
              ))}

              {!filteredHistory.length && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 text-sm">
                    No matching job approval records found.
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

export default JobApprovalHistory;
