import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import { interviewMode } from "../../../../../utils/data/interviewMode";
import MyInput from "../../Jobmanagement/components/MyInput";
import MyTextArea from "../../Jobmanagement/components/MyTextArea";

const InterviewForm = ({ accepted }) => {
  const applicantID = useSelector((state) => state.InterviewSlice.applicantID);
  const selectedApplicant = accepted.filter((app) => {
    return app.applicant.id === applicantID;
  });
  //getting the required states
  const email = selectedApplicant[0]?.applicant.email;
  const firstName = selectedApplicant[0]?.applicant.firstName;
  const lastName = selectedApplicant[0]?.applicant.lastName;
  const jobTitle = selectedApplicant[0]?.jobPosting.job_title;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  //getting logged in user
  const { data } = useApiRequest(`/api/v1/auth/get-user`);
  const userId = data.id;

  const setUpInterview = async (url, formData) => {
    try {
      setLoading(true);
      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
        })
        .then(function (response) {
          response.status === 201 ? setSuccess(true) : null;
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[80%] bg-blue-100 m-auto py-6 md:w-[70%] z-50 relative md:right-[5%] bottom-[500px]">
      {!success && !error && (
        <Formik
          initialValues={{
            jobTitle: `${jobTitle}`,
            talentName: `${firstName} ${lastName}`,
            talentEmail: `${email}`,
            interviewDate: "",
            time: "",
            description: "",
            modeOfInterview: "",
            meetingLink: "",
            interviewAddress: "",
            employerName: "",
          }}
          validationSchema={Yup.object({
            talentEmail: Yup.string().required("Required`"),
            talentName: Yup.string().required("Required`"),
            description: Yup.string().required("Required"),
            jobTitle: Yup.string().required("Required"),
            //   interviewAddress: Yup.string().required("Required"),
            //   meetingLink: Yup.string().required("Required"),
            time: Yup.string().required("Required"),
            interviewDate: Yup.string().required("Required"),
            modeOfInterview: Yup.string().required("Required"),
            employerName: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            //   console.log(values);
            setUpInterview(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/v1/admin/admin-setup-interview?adminId=${userId}`,
              values
            );
          }}>
          {(props) => (
            <Form>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="Applicant Email :"
                  className="w-full h-[50px] rounded-2xl bg-white border  pl-2"
                  type="email"
                  name="talentEmail"
                  value={props.values.talentEmail}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="Applicant Name :"
                  className="w-full h-[50px] rounded-2xl bg-white border  pl-2"
                  type="text"
                  name="talentName"
                  value={props.values.talentName}
                  onChange={props.handleChange}
                />
              </div>

              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label=" Job Title :"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="text"
                  name="jobTitle"
                  value={props.values.jobTitle}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyTextArea
                  className="w-full h-[150px] pl-2 rounded-2xl bg-white border"
                  label="Description:"
                  type="text"
                  name="description"
                  value={props.values.description}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[55%] m-auto space-y-2">
                <label className="block font-bold ">Interview Mode</label>
                <select
                  className="w-full h-[50px] bg-white border rounded-2xl"
                  required
                  id={"modeOfInterview"}
                  name="modeOfInterview"
                  value={props.values.modeOfInterview}
                  onChange={props.handleChange}>
                  {interviewMode.map(({ id, value, title }) => (
                    <option value={value} key={id}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              {/* SHow field for interviewAddress if onsite is selected */}
              {props.values.modeOfInterview === "PHYSICAL" && (
                <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                  <MyTextArea
                    label=" Interview Location :"
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                    type="text"
                    name="interviewAddress"
                    value={props.values.interviewAddress}
                    onChange={props.handleChange}
                  />
                </div>
              )}
              {/* SHow field for interview meetingLink if remote is selected */}
              {props.values.modeOfInterview === "REMOTE" && (
                <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                  <MyTextArea
                    label="Meeting Link:"
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                    type="text"
                    name="meetingLink"
                    value={props.values.meetingLink}
                    onChange={props.handleChange}
                  />
                </div>
              )}
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                {/* <label className="block font-bold md:text-2xl  "></label> */}
                <MyInput
                  label="Interview Time :"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="time"
                  name="time"
                  value={props.values.time}
                  onChange={props.handleChange}
                />
              </div>

              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="Interview Date:"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="date"
                  name="interviewDate"
                  value={props.values.interviewDate}
                  onChange={props.handleChange}
                />
              </div>

              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="Company Name:"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="text"
                  name="employerName"
                  value={props.values.employerName}
                  onChange={props.handleChange}
                />
              </div>
              <div className="w-[50%] m-auto mt-5">
                <button
                  type="submit"
                  className="bg-blue-400 m-auto text-white h-[30px] md:h-[40px] w-full font-bold  text-center rounded-2xl ">
                  {loading ? "submitting..." : "submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {success && (
        <div className="w-[90%] m-auto h-[200px] bg-transparent border border-green-500 rounded-2xl">
          <h2 className="capitalize md:text-2xl text-center pt-[80px] ">
            Interview setup <span className="font-bold">Successful</span>
          </h2>
        </div>
      )}
      {error && (
        <div className="w-[90%] m-auto h-[200px] bg-transparent border border-green-500 rounded-2xl">
          <h2 className="capitalize md:text-2xl text-center pt-[80px] ">
            Interview setup <span className="font-bold">UnSuccessful</span>.
            <br />
            Check internet connection and try again.
          </h2>
        </div>
      )}
    </div>
  );
};

export default InterviewForm;
