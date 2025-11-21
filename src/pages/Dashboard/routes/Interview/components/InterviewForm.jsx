// import React, { useState } from "react";
// import { ErrorMessage, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
// import { interviewMode } from "../../../../../utils/data/interviewMode";
// import MyInput from "../../Jobmanagement/components/MyInput";
// import MyTextArea from "../../Jobmanagement/components/MyTextArea";

// const InterviewForm = ({ accepted }) => {
//   const applicantID = useSelector((state) => state.InterviewSlice.applicantID);
//   const selectedApplicant = accepted.filter((app) => {
//     return app.applicant.id === applicantID;
//   });
//   //getting the required states
//   const email = selectedApplicant[0]?.applicant.email;
//   const firstName = selectedApplicant[0]?.applicant.firstName;
//   const lastName = selectedApplicant[0]?.applicant.lastName;
//   const jobTitle = selectedApplicant[0]?.jobPosting.job_title;

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

//   //getting logged in user
//   const { data } = useApiRequest(`/api/v1/auth/get-user`);
//   const userId = data.id;

//   const setUpInterview = async (url, formData) => {
//     try {
//       setLoading(true);
//       await axios
//         .post(url, formData, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token.token,
//           },
//         })
//         .then(function (response) {
//           response.status === 201 ? setSuccess(true) : null;
//           setLoading(false);
//         });
//     } catch (error) {
//       console.log(error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="w-[80%] bg-blue-100 m-auto py-6 md:w-[70%] z-50 relative md:right-[5%] bottom-[500px] rounded-2xl">
//       {!success && !error && (
//         <Formik
//           initialValues={{
//             jobTitle: `${jobTitle}`,
//             talentName: `${firstName} ${lastName}`,
//             talentEmail: `${email}`,
//             interviewDate: "",
//             time: "",
//             description: "",
//             modeOfInterview: "",
//             meetingLink: "",
//             interviewAddress: "",
//             employerName: "",
//           }}
//           validationSchema={Yup.object({
//             talentEmail: Yup.string().required("Required`"),
//             talentName: Yup.string().required("Required`"),
//             description: Yup.string().required("Required"),
//             jobTitle: Yup.string().required("Required"),
//             //   interviewAddress: Yup.string().required("Required"),
//             //   meetingLink: Yup.string().required("Required"),
//             time: Yup.string().required("Required"),
//             interviewDate: Yup.string().required("Required"),
//             modeOfInterview: Yup.string().required("Required"),
//             employerName: Yup.string().required("Required"),
//           })}
//           onSubmit={(values, { setSubmitting }) => {
//             //   console.log(values);
//             setUpInterview(
//               `${
//                 import.meta.env.VITE_BASE_URL
//               }/api/v1/admin/admin-setup-interview?adminId=${userId}`,
//               values
//             );
//           }}>
//           {(props) => (
//             <Form>
//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 <MyInput
//                   label="Applicant Email :"
//                   className="w-full h-[50px] rounded-2xl bg-white border  pl-2"
//                   type="email"
//                   name="talentEmail"
//                   value={props.values.talentEmail}
//                   onChange={props.handleChange}
//                 />
//               </div>
//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 <MyInput
//                   label="Applicant Name :"
//                   className="w-full h-[50px] rounded-2xl bg-white border  pl-2"
//                   type="text"
//                   name="talentName"
//                   value={props.values.talentName}
//                   onChange={props.handleChange}
//                 />
//               </div>

//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 <MyInput
//                   label=" Job Title :"
//                   className="w-full h-[50px] rounded-2xl bg-white border pl-3"
//                   type="text"
//                   name="jobTitle"
//                   value={props.values.jobTitle}
//                   onChange={props.handleChange}
//                 />
//               </div>
//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 <MyTextArea
//                   className="w-full h-[50px] pl-2 rounded-2xl bg-white border"
//                   label="Description:"
//                   type="text"
//                   name="description"
//                   value={props.values.description}
//                   onChange={props.handleChange}
//                 />
//               </div>
//               <div className=" w-[90%] md:w-[55%] m-auto space-y-2">
//                 <label className="block ">Interview Mode</label>
//                 <select
//                   className="w-full h-[50px] bg-white border rounded-2xl"
//                   required
//                   id={"modeOfInterview"}
//                   name="modeOfInterview"
//                   value={props.values.modeOfInterview}
//                   onChange={props.handleChange}>
//                   {interviewMode.map(({ id, value, title }) => (
//                     <option value={value} key={id}>
//                       {title}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* SHow field for interviewAddress if onsite is selected */}
//               {props.values.modeOfInterview === "PHYSICAL" && (
//                 <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                   <MyTextArea
//                     label=" Interview Location :"
//                     className="w-full h-[50px] rounded-2xl bg-white border pl-3"
//                     type="text"
//                     name="interviewAddress"
//                     value={props.values.interviewAddress}
//                     onChange={props.handleChange}
//                   />
//                 </div>
//               )}
//               {/* SHow field for interview meetingLink if remote is selected */}
//               {props.values.modeOfInterview === "REMOTE" && (
//                 <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                   <MyTextArea
//                     label="Meeting Link:"
//                     className="w-full h-[50px] rounded-2xl bg-white border pl-3"
//                     type="text"
//                     name="meetingLink"
//                     value={props.values.meetingLink}
//                     onChange={props.handleChange}
//                   />
//                 </div>
//               )}
//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 {/* <label className="block font-bold md:text-2xl  "></label> */}
//                 <MyInput
//                   label="Interview Time :"
//                   className="w-full h-[50px] rounded-2xl bg-white border pl-3"
//                   type="time"
//                   name="time"
//                   value={props.values.time}
//                   onChange={props.handleChange}
//                 />
//               </div>

//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 <MyInput
//                   label="Interview Date:"
//                   className="w-full h-[50px] rounded-2xl bg-white border pl-3"
//                   type="date"
//                   name="interviewDate"
//                   value={props.values.interviewDate}
//                   onChange={props.handleChange}
//                 />
//               </div>

//               <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
//                 <MyInput
//                   label="Company Name:"
//                   className="w-full h-[50px] rounded-2xl bg-white border pl-3"
//                   type="text"
//                   name="employerName"
//                   value={props.values.employerName}
//                   onChange={props.handleChange}
//                 />
//               </div>
//               <div className="w-[50%] m-auto mt-5">
//                 <button
//                   type="submit"
//                   className="bg-blue-400 m-auto text-white h-[30px] md:h-[40px] w-full font-bold  text-center rounded-2xl ">
//                   {loading ? "submitting..." : "submit"}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       )}
//       {success && (
//         <div className="w-[90%] m-auto h-[200px] bg-transparent border border-green-500 rounded-2xl">
//           <h2 className="capitalize md:text-2xl text-center pt-[80px] ">
//             Interview setup <span className="font-bold">Successful</span>
//           </h2>
//         </div>
//       )}
//       {error && (
//         <div className="w-[90%] m-auto h-[200px] bg-transparent border border-green-500 rounded-2xl">
//           <h2 className="capitalize md:text-2xl text-center pt-[80px] ">
//             Interview setup <span className="font-bold">UnSuccessful</span>.
//             <br />
//             Check internet connection and try again.
//           </h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewForm;

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import { interviewMode } from "../../../../../utils/data/interviewMode";
import MyInput from "../../Jobmanagement/components/MyInput";
import MyTextArea from "../../Jobmanagement/components/MyTextArea";
import { toast } from "react-toastify";

const InterviewForm = ({ accepted, setFormOpen }) => {
  const applicantID = useSelector((state) => state.InterviewSlice.applicantID);

  const selectedApplicant = accepted.find(
    (app) => app.applicant.id === applicantID
  );

  const email = selectedApplicant?.applicant.email || "";
  const firstName = selectedApplicant?.applicant.firstName || "";
  const lastName = selectedApplicant?.applicant.lastName || "";
  const jobTitle = selectedApplicant?.jobPosting.job_title || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const { data } = useApiRequest(`/api/v1/auth/get-user`);
  const userId = data?.id;

  const setUpInterview = async (url, formData) => {
    try {
      setLoading(true);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        toast.success("Interview invite sent!");
        setFormOpen(false);
      }
    } catch (error) {
      setError(true);
      toast.error("Interview invite failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-2xl w-full h-[500px] overflow-y-auto shadow-lg p-10 rounded-3xl ">
        {/* FORM */}
        {
          <Formik
            initialValues={{
              jobTitle,
              talentName: `${firstName} ${lastName}`,
              talentEmail: email,
              interviewDate: "",
              time: "",
              description: "",
              modeOfInterview: "",
              meetingLink: "",
              interviewAddress: "",
              employerName: "",
            }}
            validationSchema={Yup.object({
              talentEmail: Yup.string().required("Required"),
              talentName: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              jobTitle: Yup.string().required("Required"),
              time: Yup.string().required("Required"),
              interviewDate: Yup.string().required("Required"),
              modeOfInterview: Yup.string().required("Required"),
              employerName: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
              setUpInterview(
                `${
                  import.meta.env.VITE_BASE_URL
                }/api/v1/admin/admin-setup-interview?adminId=${userId}`,
                values
              );
            }}>
            {(props) => (
              <Form className="space-y-5">
                {/* Applicant Info */}
                <div className="grid gap-4">
                  <MyInput
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                    label="Applicant Email"
                    name="talentEmail"
                    type="email"
                  />

                  <MyInput
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                    label="Applicant Name"
                    name="talentName"
                    type="text"
                  />

                  <MyInput
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                    label="Job Title"
                    name="jobTitle"
                    type="text"
                  />
                </div>

                {/* Interview Mode */}
                <div className="flex flex-col gap-2 items-center">
                  <MyTextArea
                    label="Description"
                    name="description"
                    className="h-28 w-full border"
                  />
                  {/* <label className="block font-medium !text-start mb-1">
                    Interview Mode
                  </label> */}
                  <select
                    name="modeOfInterview"
                    value={props.values.modeOfInterview}
                    onChange={props.handleChange}
                    className="w-[90%] !m-auto h-[50px] px-3 border bg-white rounded-2xl">
                    <option value="">Select interview mode</option>
                    {interviewMode.map(({ id, value, title }) => (
                      <option key={id} value={value}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Fields */}
                {props.values.modeOfInterview === "PHYSICAL" && (
                  <MyTextArea
                    label="Interview Location"
                    name="interviewAddress"
                    className="w-full h-[50px] rounded-2xl bg-white border p-3"
                  />
                )}

                {props.values.modeOfInterview === "REMOTE" && (
                  <MyTextArea
                    label="Meeting Link"
                    name="meetingLink"
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  />
                )}

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <MyInput
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                    label="Interview Time"
                    name="time"
                    type="time"
                  />
                  <MyInput
                    label="Interview Date"
                    name="interviewDate"
                    type="date"
                    className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  />
                </div>

                {/* Employer */}
                <MyInput
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  label="Company Name"
                  name="employerName"
                  type="text"
                />

                {/* Submit */}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white h-[45px] w-full font-semibold rounded-2xl hover:bg-blue-700 transition">
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    onClick={() => {
                      setFormOpen(false);
                    }}
                    className="bg-red-600 text-white h-[45px] w-full font-semibold rounded-2xl hover:bg-red-700 transition">
                    {"Close"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        }
      </div>
    </div>
  );
};

export default InterviewForm;
