import React, { useState } from "react";
import Logo from "../../../../static/images/logoblue.png";
import { Formik, Field, ErrorMessage, Form } from "formik";

const PostJobs = () => {
  const [companyBio, setCompanyBio] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  return (
    <div className="w-full bg-white h-full overflow-y-scroll">
      <div className=" m-auto text-center">
        <img className="text-center m-auto" src={Logo} alt="logo" />
      </div>
      <div className="w-[90%] m-auto">
        <Formik
          initialValues={{ JobTitle: "", EmployerContactDetails: "" }}
          onSubmit={(values) => {}}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold mb-8">
                  Job Title
                </label>
                <Field
                  as="input"
                  className="bg-[#2596BE20] rounded-[10px] pl-3 block w-full h-[40px]"
                  type="text"
                  name="JobTitle"
                />
                <ErrorMessage
                  name="JobTitle"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold">
                  Company Bio
                </label>
                <Field
                  as="textarea"
                  className="bg-[#2596BE20] rounded-[20px] pl-3 block w-full h-[100px]"
                  type="text"
                  name="Company Bio"
                  value={companyBio}
                  onChange={(e) => {
                    setCompanyBio(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="Company Bio"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold">
                  Job Description
                </label>
                <Field
                  as="textarea"
                  className="bg-[#2596BE20] rounded-[20px] pl-3 block w-full h-[100px]"
                  type="text"
                  name="Company Bio"
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="Company Bio"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold">
                  Responsibilities
                </label>
                <Field
                  as="textarea"
                  className="bg-[#2596BE20] rounded-[20px] pl-3 block w-full h-[100px]"
                  type="text"
                  name="Responsibilities"
                  value={responsibilities}
                  onChange={(e) => {
                    setResponsibilities(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="Responsibilties"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold">
                  Requirements
                </label>
                <Field
                  as="textarea"
                  className="bg-[#2596BE20] rounded-[20px] pl-3 block w-full h-[100px]"
                  type="text"
                  name="Requirements"
                  value={requirements}
                  onChange={(e) => {
                    setRequirements(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="Requirements"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold">
                  Benefits
                </label>
                <Field
                  as="textarea"
                  className="bg-[#2596BE20] rounded-[20px] pl-3 block w-full h-[100px]"
                  type="text"
                  name="Benefits"
                  value={benefits}
                  onChange={(e) => {
                    setBenefits(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="Benefits"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="text"
                  className="text-sm text-black pl-3 font-semibold">
                  Job Location
                </label>
                <Field
                  as="textarea"
                  className="bg-[#2596BE20] rounded-[10px] pl-3 block w-full h-[40px]"
                  type="text"
                  name="Job Location"
                  value={jobLocation}
                  onChange={(e) => {
                    setJobLocation(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="Job Location"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <div className="w-full mb-4">
                <label
                  htmlFor="text"
                  className="text-sm text-black font-semibold">
                  Employer Contact Details
                </label>
                <Field
                  className="bg-[#2596BE20] rounded-[10px] block w-full h-[40px] pl-3 md:h-[70px]]"
                  type="text"
                  name="EmployerContactDetails"
                />
                <ErrorMessage
                  name="Employer Contact Details"
                  component="span"
                  className="text-[#db3a3a]"
                />
              </div>
              <button
                className="w-[100%] mt-4 bg-[#006A90] text-white rounded-[20px] py-2 cursor-pointer "
                type="submit"
                disabled={isSubmitting}>
                Post Job
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostJobs;
