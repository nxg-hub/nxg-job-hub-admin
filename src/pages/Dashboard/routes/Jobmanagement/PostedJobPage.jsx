import React from "react";
import eos from "../../../../static/icons/eos-icons_cronjob.svg";
import RecentPostedJobs from "./RecentPostedJobs";

const PostedJobPage = () => {
  return (
    <section className="w-full h-full overflow-y-scroll bg-gray-300 py-3">
      <div className="bg-white w-[90%] m-auto flex justify-between h-[50px] py-2 px-2 rounded-sm items-center">
        <h3 className="text-[#2596BE] font-bold">Dashboard</h3>
        <button className="bg-[#006A90] py-2 px-2 text-white rounded-md cursor-pointer">
          Post Jobs
        </button>
      </div>
      <section className=" w-[90%] m-auto md:flex md:gap-4">
        <div className="w-[50%] m-auto md:w-[30%]">
          <h2 className="text-[#2596BE] text-center font-bold py-4">
            Engagement
          </h2>
          <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-2">
            <h1 className="font-bold">100</h1>
            <h2>Jobs Posted</h2>
          </div>
          <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-2">
            <h1 className="font-bold">57</h1>
            <h2>Applicants </h2>
          </div>
          <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-2">
            <h1 className="font-bold">45</h1>
            <h2>Reviewed</h2>
          </div>
          <div className="bg-white text-black pl-3 rounded-sm my-2 md:py-1">
            <h1 className="font-bold">27</h1>
            <h2>Shortlisted</h2>
          </div>
        </div>
        <div className="w-[75%] m-auto md:w-[35%]">
          <h2 className="text-[#2596BE] font-bold py-4 text-center">Task</h2>
          <div className="bg-white w-full flex justify-around font-bold rounded-sm">
            <button>New</button>
            <button>Delayed</button>
            <button>Completed</button>
          </div>
          <div className="bg-[#E0E0E0]">
            <div className=" border-b border-b-gray-400 text-center">
              <span>Meeting with UX Designer</span>
              <span className="block">23/10/23</span>
            </div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          </div>
        </div>
        <div className="w-[75%] m-auto md:w-[35%]">
          <h2 className="text-[#2596BE] font-bold py-4 text-center">
            Interviews
          </h2>
          <div className="bg-white w-full flex justify-around font-bold rounded-sm ">
            <button>New</button>
            <button>Delayed</button>
            <button>Completed</button>
          </div>
          <div className="bg-[#E0E0E0]">
            <div className=" border-b border-b-gray-400 text-center">
              <span>Meeting with UX Designer</span>
              <span className="block">23/10/23</span>
            </div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
            <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <div>
          <h1 className="text-[#2596BE] font-bold text-center md:text-left md:ml-[5%]">
            Recently Posted Jobs
          </h1>
          <RecentPostedJobs />
        </div>
      </section>
    </section>
  );
};

export default PostedJobPage;
