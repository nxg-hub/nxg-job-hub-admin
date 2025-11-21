import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployer } from "../../../../Redux/EmployerSlice";
import Spinner from "../../../../static/icons/wheel.svg";
import avatar from "../../../../static/images/userIcon.png";
import FeedBackModal from "./component/FeedBackModal";
import {
  setFeedBackModalFalse,
  setFeedBackModalTrue,
} from "../../../../Redux/FeedBackSlice";

const FeedBack = () => {
  const dispatch = useDispatch();

  // Redux states
  const employer = useSelector((state) => state.EmployerSlice.employer);
  const loading = useSelector((state) => state.EmployerSlice.loading);
  const error = useSelector((state) => state.EmployerSlice.error);
  const success = useSelector((state) => state.EmployerSlice.success);
  const modal = useSelector((state) => state.FeedBackSlice.feedbackModal);

  // Search state
  const [search, setSearch] = useState("");

  const openModal = (id) => {
    dispatch(setFeedBackModalTrue(id));
  };

  useEffect(() => {
    if (!success) dispatch(fetchEmployer({ page: 0, size: 100000 }));
  }, []);

  // Filtering employers
  const filteredEmployers = employer.filter((user) => {
    const searchTerm = search.toLowerCase();
    return (
      user?.user?.firstName?.toLowerCase().includes(searchTerm) ||
      user?.employer?.companyName?.toLowerCase().includes(searchTerm) ||
      user.user.email?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="w-full h-full overflow-y-auto py-5 px-4">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
        Employer Feedbacks
      </h2>

      {/* Search Input */}
      <div className="w-full md:w-[60%] mx-auto mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Search employer by name, company or email..."
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <img src={Spinner} className="w-14 " alt="Loading..." />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center mt-20 text-red-600 text-lg font-medium">
          Something went wrong. Check your internet connection.
        </div>
      )}

      {/* Employer List */}
      {!loading && !error && (
        <div className="space-y-4">
          {filteredEmployers.length === 0 ? (
            <p className="text-center text-gray-600 mt-10 text-lg">
              No matching employers found.
            </p>
          ) : (
            filteredEmployers.map((user) => (
              <div
                key={user.user.id}
                className="flex items-center justify-between bg-white shadow-sm border p-4 rounded-xl">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  <img
                    src={user.user.profilePicture || avatar}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {user?.user?.firstName}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {user?.employer?.companyName}
                    </p>
                    <p className="text-sm text-gray-500">{user.user.email}</p>
                  </div>
                </div>

                {/* Right Button */}
                <button
                  onClick={() => openModal(user.user.id)}
                  className="bg-[#2596BE] text-white px-4 py-2 rounded-lg transition-all shadow-sm text-sm">
                  View Feedback
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Feedback Modal */}
      {modal && <FeedBackModal />}
    </div>
  );
};

export default FeedBack;
