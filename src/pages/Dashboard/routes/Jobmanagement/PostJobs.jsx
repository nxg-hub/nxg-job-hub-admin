import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../../../../static/images/logoblue.png";
import MyTextArea from "./components/MyTextArea";
import axios from "axios";
import Spinner from "../../../../static/icons/wheel.svg";

const postJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
              responsibilities: "",
              requirements: "",
              salary: "",
              job_location: "",
              EmployerContactDetails: "",
            }}
            validationSchema={Yup.object({
              job_title: Yup.string()
                // .max(15, "Must be 15 characters or less")
                .required("Required"),
              company_bio: Yup.string()
                // .max(20, "Must be 20 characters or less")
                .required("Required"),
              job_description: Yup.string()
                // .email("Invalid email addresss`")
                .required("Required"),
              responsibilities: Yup.string().required("Required"),
              // .oneOf([true], "You must accept the terms and conditions."),
              requirements: Yup.string().required("Required"),
              salary: Yup.string().required("Required"),
              job_location: Yup.string().required("Required"),
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
            <Form>
              <MyTextArea
                className="h-[50px] w-full bg-[#2596BE20] rounded-lg"
                label="Job Title "
                name="job_title"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                label="Company Bio "
                name="company_bio"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                label="Job Description "
                name="job_description"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                label="Responsibilities "
                name="responsibilities"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                label="Requirements "
                name="requirements"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                className="h-[50px] w-full bg-[#2596BE20] rounded-lg"
                label="Salary "
                name="salary"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                className="h-[50px] w-full bg-[#2596BE20] rounded-lg"
                label="Job Location "
                name="job_location"
                rows="6"
                placeholder=""
              />
              <MyTextArea
                className="h-[50px] w-full bg-[#2596BE20] rounded-lg"
                label="Employer Contact Details "
                name="EmployerContactDetails"
                rows="6"
                placeholder=""
              />
              <div className="w-[90%] m-auto">
                <button
                  className="w-[100%] rounded-full text-center py-2 my-10 text-white m-auto bg-[#006A90]"
                  type="submit">
                  Post Job
                </button>
              </div>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
};

export default postJobs;
