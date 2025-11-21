import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../../../../static/images/logoblue.png";
import MyTextArea from "./components/MyTextArea";
import axios from "axios";
import MyInput from "./components/MyInput";
import {
  jobMode,
  jobTypes,
  nigerianStates,
} from "../../../../utils/data/jobTypes";

// ================= PREVIEW MODAL =====================
const PreviewModal = ({ values, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white shadow-xl w-[90%] md:w-[600px] h-[550px] overflow-y-scroll rounded-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">
          Preview Job Posting
        </h2>

        <div className="space-y-3 text-sm">
          <p>
            <strong>Job Title:</strong> {values.job_title}
          </p>
          <p>
            <strong>Company Bio:</strong> {values.company_bio}
          </p>
          <p>
            <strong>Description:</strong> {values.job_description}
          </p>
          <p>
            <strong>Requirements:</strong> {values.requirements}
          </p>
          <p>
            <strong>Salary:</strong> {values.salary}
          </p>
          <p>
            <strong>Deadline:</strong> {values.deadline}
          </p>
          <p>
            <strong>Location:</strong> {values.job_location}
          </p>
          <p>
            <strong>Classification:</strong> {values.jobClassification}
          </p>
          <p>
            <strong>Job Mode:</strong> {values.job_mode}
          </p>
          <p>
            <strong>Job Type:</strong> {values.job_type}
          </p>
          <p>
            <strong>Tags:</strong> {values.tags.join(", ")}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 rounded bg-gray-300" onClick={onClose}>
            Close
          </button>

          <button
            className="px-4 py-2 rounded bg-[#006A90] text-white"
            onClick={onConfirm}>
            Confirm & Post Job
          </button>
        </div>
      </div>
    </div>
  );
};
// =====================================================

const PostJobs = () => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const postJob = async (url, formData, resetForm) => {
    try {
      setLoading(true);

      await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
      });

      toast.success("Job posted successfully");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong, check internet connection and try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] overflow-y-scroll pb-10">
      <div>
        <img className="m-auto" src={logo} alt="logo" />
      </div>

      <Formik
        initialValues={{
          job_title: "",
          company_bio: "",
          job_description: "",
          deadline: "",
          requirements: "",
          salary: "",
          job_location: "",
          tags: [],
          job_mode: "",
          job_type: "",
          jobClassification: "",
        }}
        validationSchema={Yup.object({
          job_title: Yup.string().required("Required"),
          company_bio: Yup.string()
            .min(20, "Company bio must have at least 20 characters")
            .required("Required"),
          job_description: Yup.string()
            .min(20, "Job description must have at least 20 characters")
            .required("Required"),
          deadline: Yup.string().required("Required"),
          requirements: Yup.string().required("Required"),
          salary: Yup.number()
            .typeError("Salary must be a number") // shows error if input is not numeric
            .positive("Salary must be a positive number")
            .required("Salary is required"),
          job_location: Yup.string().required("Required"),
          job_mode: Yup.string().required("Required"),
          job_type: Yup.string().required("Required"),
          jobClassification: Yup.string().required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          postJob(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/post-job`,
            values,
            resetForm
          );
        }}>
        {(props) => (
          <Form>
            <MyTextArea
              className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
              label="Job Title"
              name="job_title"
              placeholder="Ex: Senior Frontend Developer"
              onChange={props.handleChange}
            />

            <MyTextArea
              label="Company Bio"
              name="company_bio"
              onChange={props.handleChange}
            />

            <MyTextArea
              label="Job Description"
              name="job_description"
              onChange={props.handleChange}
            />

            <MyTextArea
              label="Requirements"
              name="requirements"
              placeholder="Ex: React, Tailwind, 5 years experience"
              onChange={props.handleChange}
            />

            <MyInput
              className="h-[50px] px-3 pt-3 w-[100%] m-auto bg-[#2596BE20] rounded-lg"
              label="Application Deadline"
              name="deadline"
              type="date"
              onChange={props.handleChange}
            />

            <MyInput
              type="number"
              className="h-[50px] px-3 pt-3 w-[100%] m-auto bg-[#2596BE20] rounded-lg"
              label="Salary"
              name="salary"
              placeholder="Ex: 150,000/month"
              onChange={props.handleChange}
            />

            {/* Job Location */}
            <div className="flex flex-col w-[90%] m-auto">
              <label>Job Location</label>
              <select
                className="bg-[#2596BE20] h-[50px] rounded-lg"
                name="job_location"
                onChange={props.handleChange}>
                <option value="">Select State</option>
                {nigerianStates.map(({ i, value, label }) => (
                  <option key={i} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Classification */}
            <div className="flex flex-col w-[90%] m-auto">
              <label>Job Classification</label>
              <select
                className="bg-[#2596BE20] h-[50px] rounded-lg"
                name="jobClassification"
                defaultValue=""
                onChange={props.handleChange}>
                <option value="" disabled hidden>
                  Choose job classification
                </option>
                <option value="SERVICE">
                  Service, customer or operational support roles
                </option>
                <option value="PROFESSIONAL">
                  Professional, skilled or expert-level roles
                </option>
              </select>
            </div>

            {/* Tags */}
            <MyInput
              className="h-[50px] px-3 pt-3 w-[100%] m-auto bg-[#2596BE20] rounded-lg"
              label="Tags"
              name="tags"
              placeholder="frontend, backend, designer"
              value={props.values.tags.join(", ")}
              onChange={(e) => {
                const arr = e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag.length > 0);

                props.setFieldValue("tags", arr);
              }}
            />

            {/* Job Mode */}
            <div className="flex flex-col w-[90%] m-auto">
              <label>Job Mode</label>
              <select
                className="bg-[#2596BE20] h-[50px] rounded-lg"
                name="job_mode"
                onChange={props.handleChange}>
                <option value="">Select Mode</option>
                {jobMode.map(({ id, value, title }) => (
                  <option value={value} key={id}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="flex flex-col w-[90%] m-auto">
              <label>Job Type</label>
              <select
                className="bg-[#2596BE20] h-[50px] rounded-lg"
                name="job_type"
                onChange={props.handleChange}>
                <option value="">Select Type</option>
                {jobTypes.map(({ id, value, title }) => (
                  <option value={value} key={id}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* Preview Button */}
            <div className="w-[90%] m-auto">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="w-full rounded-full py-2 my-10 text-white bg-[#006A90]">
                Preview Job
              </button>
            </div>

            {/* Preview Modal */}
            {showPreview && (
              <PreviewModal
                values={props.values}
                onClose={() => setShowPreview(false)}
                onConfirm={() => {
                  setShowPreview(false);
                  props.handleSubmit();
                }}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostJobs;
