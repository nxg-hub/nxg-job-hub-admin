import React from "react";

const RecentPostedJobs = () => {
  return (
    <div className="w-[70%] md:w-[90%] m-auto bg-white h-[300px] rounded-md pl-4">
      <h2 className="font-bold">Job Type:</h2>
      <h2 className="font-bold">Job Description:</h2>
      <div>
        <p>Number of A pplications:</p>
      </div>
      <button className="bg-[#006A90] text-white py-2 px-6 rounded-md">
        Review Application
      </button>
    </div>
  );
};

export default RecentPostedJobs;
