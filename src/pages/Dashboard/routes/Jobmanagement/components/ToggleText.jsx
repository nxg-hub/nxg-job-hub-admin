import React, { useState } from "react";
import { Link } from "react-router-dom";
const ToggleText = ({ job }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(() => !toggle);
  };
  return (
    <>
      <div
        className={`" w-full h-[120px] sm:h-[80px] md:h-[50px] overflow-hidden transition-all relative${
          toggle
            ? " md:!h-[180px] transition-all duration-200 !h-[300px] sm:!h-[200px]"
            : "h-[80px]"
        }`}>
        <h5 className="font-extrabold">Description:</h5>
        <p className="font-normal">
          {job.jobDescription ? job.jobDescription : job.job_description}
        </p>
      </div>
      <Link
        onClick={handleToggle}
        className="float-end mr-[5%] mt-[-150px] underline text-blue-600">
        {toggle ? "See Less" : "See More"}
      </Link>
    </>
  );
};

export default ToggleText;
