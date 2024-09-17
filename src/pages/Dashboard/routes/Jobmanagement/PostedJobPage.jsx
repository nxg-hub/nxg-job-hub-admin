import React, { useEffect, useState } from "react";
import eos from "../../../../static/icons/eos-icons_cronjob.svg";
import RecentPostedJobs from "./RecentPostedJobs";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../../Redux/JobSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../static/icons/wheel.svg";
import ReactPaginate from "react-paginate";
import Task from "./components/Task";
import Interview from "./components/Interview";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";

const PostedJobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminJobs = useSelector((state) => state.jobSlice.jobs);
  const loading = useSelector((state) => state.jobSlice.loading);
  const error = useSelector((state) => state.jobSlice.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);
  // Get current posts
  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobs = adminJobs?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const { data: count } = useApiRequest(`/api/v1/admin/count`);
  const { data: counter } = useApiRequest(
    `/api/v1/admin/counts/get-applications/admin`
  );

  useEffect(() => {
    //fecthing All Jobs to display in ui
    dispatch(fetchJobs(`/api/v1/admin/get-all-jobs-by-admin`));
  }, []);

  return (
    <section className="w-full h-[100vh] overflow-y-scroll bg-gray-300 py-3">
      {loading ? (
        <img
          src={Spinner}
          className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
          alt="loading"
        />
      ) : (
        <>
          <div className="bg-white w-[90%] m-auto flex justify-between h-[50px] py-2 px-2 rounded-sm items-center">
            <h3 className="text-[#2596BE] font-bold">Dashboard</h3>
            <button
              onClick={() => {
                navigate("/jobmanagement/postjob");
              }}
              className="bg-[#006A90] py-2 px-2 text-white rounded-md cursor-pointer">
              Post Jobs
            </button>
          </div>
          <section className=" w-[90%] m-auto md:flex md:gap-4">
            <div className="w-[50%] m-auto md:w-[30%]">
              <h2 className="text-[#2596BE] text-center font-bold py-4">
                Engagement
              </h2>
              <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-2">
                <h1 className="font-bold">{count.totalJobs}</h1>
                <h2>Jobs Posted</h2>
              </div>
              <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-2">
                <h1 className="font-bold">{count.totalApplications}</h1>
                <h2>Applicants </h2>
              </div>
              <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-2">
                <h1 className="font-bold">{counter.shortlisted}</h1>
                <h2>Reviewed</h2>
              </div>
              <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-1">
                <h1 className="font-bold">{counter.reviewed}</h1>
                <h2>Shortlisted</h2>
              </div>
            </div>
            <Task />
            <Interview />
          </section>
          <section className="mt-8">
            <div>
              <h1 className="text-[#2596BE] font-bold text-center md:text-left md:ml-[5%]">
                ADMIN Posted Jobs
              </h1>
              {currentJobs.map((job) => (
                <RecentPostedJobs job={job} key={job.jobID} />
              ))}
            </div>
          </section>
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(adminJobs.length / jobsPerPage)}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-number"}
            previousLinkClassName={"page-number"}
            nextLinkClassName={"page-number"}
            activeLinkClassName="active bg-[#2596BE] px-3"
            className="flex w-[90%] m-auto justify-between pt-4"
          />
        </>
      )}
    </section>
  );
};

export default PostedJobPage;

// {
//   loading ? (
//     <img
//       src={Spinner}
//       className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
//       alt="loading"
//     />
//   ) : null;
// }
