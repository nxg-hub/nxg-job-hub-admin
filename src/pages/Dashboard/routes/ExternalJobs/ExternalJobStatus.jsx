import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../static/icons/wheel.svg";
import JobStatusCard from "./component/JobStatusCard";
import { fetchExternalJobs } from "../../../../Redux/ExternalJobSlice";

const ExternalJobStatus = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.ExternalJobSlice.externalJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const loading = useSelector((state) => state.ExternalJobSlice.loading);
  const error = useSelector((state) => state.ExternalJobSlice.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);

  //   const filteredJob =
  //     searchTerm && jobs.length > 0
  //       ? jobs.filter((job) => job?.jobTitle?.toLowerCase().includes(searchTerm))
  //       : jobs;
  useEffect(() => {
    //fecthing All External Jobs and displaying them in the ui
    dispatch(fetchExternalJobs("/api/v1/job-posts"));
  }, []);
  return (
    <div className="h-full overflow-y-scroll">
      <div className=" w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-11 ">
        {loading ? (
          <img
            className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[20%] md:right-[40%] md:h-[500px] m-auto mt-[-150px]"
            src={Spinner}
            alt="loader"
          />
        ) : error && !loading ? (
          <h2 className="text-center font-bold">
            Something went wrong, check internet connection
          </h2>
        ) : jobs.length > 0 ? (
          jobs.map((job, i) => <JobStatusCard job={job} key={i} />)
        ) : (
          <h2 className="text-center font-bold">No Users At The Moment.</h2>
        )}
      </div>
    </div>
  );
};

export default ExternalJobStatus;
