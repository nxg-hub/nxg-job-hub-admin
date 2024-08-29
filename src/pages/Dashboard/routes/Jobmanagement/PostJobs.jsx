import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../../../../static/images/logoblue.png";
import MyTextArea from "./components/MyTextArea";
import axios from "axios";
import Spinner from "../../../../static/icons/wheel.svg";
import MyInput from "./components/MyInput";
import { updateField } from "../../../../utils/functions/updateField";

const postJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-CA");
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const postJob = async (url, formData) => {
    try {
      setLoading(true);
      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
        })
        .then(function (response) {
          toast("job posted successfully");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast("Something went wrong, check internet connection and try again");
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[100vh] overflow-y-scroll pb-10">
      {loading ? (
        <img
          src={Spinner}
          className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px]">
          <h1>
            Something went wrong, check internet connection and try again.
            <br />
            Refresh page to go back to previous page
          </h1>
        </div>
      ) : (
        <>
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
              tags: "",
              // deadline: "",
              job_type: "",
              EmployerContactDetails: "",
            }}
            validationSchema={Yup.object({
              job_title: Yup.string()
                // .max(15, "Must be 15 characters or less")
                .required("Required"),
              company_bio: Yup.string()
                .min(20, "Company bio must have at least 20 characters")
                .required("Required"),
              job_description: Yup.string()
                .min(20, "job description must have at least 20 characters")
                // .email("Invalid email addresss`")
                .required("Required"),
              deadline: Yup.string().required("Required"),
              // .oneOf([true], "You must accept the terms and conditions."),
              requirements: Yup.string().required("Required"),
              salary: Yup.string().required("Required"),
              job_location: Yup.string().required("Required"),
              tags: Yup.string().required("Required"),
              // deadline: Yup.string().required("Required"),
              job_type: Yup.string().required("Required"),
              EmployerContactDetails: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
              postJob(
                `${import.meta.env.VITE_BASE_URL}/api/v1/admin/post-job`,
                values
              );
            }}>
            {(props) => (
              <Form>
                <MyTextArea
                  className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                  label="Job Title "
                  name="job_title"
                  rows="6"
                  placeholder="Ex: Senior Frontend Developer"
                  value={props.values.job_title}
                  onChange={props.handleChange}
                />
                <MyTextArea
                  label="Company Bio "
                  name="company_bio"
                  rows="6"
                  placeholder=""
                  value={props.values.company_bio}
                  onChange={props.handleChange}
                />
                <MyTextArea
                  label="Job Description "
                  name="job_description"
                  rows="6"
                  placeholder=""
                  value={props.values.job_description}
                  onChange={props.handleChange}
                />

                <MyTextArea
                  label="Requirements "
                  name="requirements"
                  rows="6"
                  placeholder="Ex: React, Tailwind, 5 years experience, etc."
                  value={props.values.requirements}
                  onChange={props.handleChange}
                />
                <MyInput
                  className="h-[50px] px-3 pt-3 w-[100%] m-auto bg-[#2596BE20] rounded-lg"
                  label="Application Deadline"
                  name="deadline"
                  rows="6"
                  placeholder=""
                  type="date"
                  onChange={props.handleChange}
                  // value={props.values.deadline}
                />

                <MyTextArea
                  className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                  label="Salary "
                  name="salary"
                  rows="6"
                  placeholder="Ex: 120,000/yr"
                  value={props.values.salary}
                  type="number"
                  onChange={props.handleChange}
                />
                <MyTextArea
                  className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                  label="Job Location "
                  name="job_location"
                  rows="6"
                  placeholder=""
                  value={props.values.job_location}
                  onChange={props.handleChange}
                />
                <MyInput
                  className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                  label="Tags "
                  name="tags"
                  rows="6"
                  placeholder="Ex: Frontend/backend..."
                  // value={props.values.tags}
                  onChange={props.handleChange}
                />
                {/* <MyTextArea
                className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                label="Application Deadline "
                name="deadline"
                rows="6"
                placeholder="Ex: dd/mm/yy"
                type="date"
              /> */}
                <MyTextArea
                  className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                  label="Job Type "
                  name="job_type"
                  rows="6"
                  placeholder="Ex: remote/onsite/hybrid"
                  value={props.values.job_type}
                  onChange={props.handleChange}
                />
                <MyTextArea
                  className="h-[50px] px-3 pt-3 w-full bg-[#2596BE20] rounded-lg"
                  label="Employer Contact Details "
                  name="EmployerContactDetails"
                  rows="6"
                  placeholder=""
                  value={props.values.EmployerContactDetails}
                  onChange={props.handleChange}
                />
                <div className="w-[90%] m-auto">
                  <button
                    className="w-[100%] rounded-full text-center py-2 my-10 text-white m-auto bg-[#006A90]"
                    type="submit">
                    Post Job
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default postJobs;
