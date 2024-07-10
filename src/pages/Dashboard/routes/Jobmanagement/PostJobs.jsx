import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../../../../static/images/logoblue.png";
import MyTextArea from "./components/MyTextArea";

// const MyTextInput = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input> and alse replace ErrorMessage entirely.
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className="text-input" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const MyTextArea = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input> and alse replace ErrorMessage entirely.
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <textarea className="text-area" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// And now we can use these
const postJobs = () => {
  return (
    <div className="h-[100vh] overflow-y-scroll pb-10">
      <div>
        <img className="m-auto" src={logo} alt="logo" />
      </div>
      <Formik
        initialValues={{
          jobTitle: "",
          companyBio: "",
          jobDescription: "",
          responsibilities: "",
          requirements: "",
          benefits: "",
          jobLocation: "",
          EmployerContactDetails: "",
        }}
        validationSchema={Yup.object({
          jobTitle: Yup.string()
            // .max(15, "Must be 15 characters or less")
            .required("Required"),
          companyBio: Yup.string()
            // .max(20, "Must be 20 characters or less")
            .required("Required"),
          jobDescription: Yup.string()
            // .email("Invalid email addresss`")
            .required("Required"),
          responsibilities: Yup.string()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          requirements: Yup.string().required("Required"),
          benefits: Yup.string().required("Required"),
          jobLocation: Yup.string().required("Required"),
          EmployerContactDetails: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}>
        <Form>
          <MyTextArea
            className="h-[50px] w-full bg-[#2596BE20] rounded-lg"
            label="Job Title "
            name="jobTitle"
            rows="6"
            placeholder=""
          />
          <MyTextArea
            label="Company Bio "
            name="companyBio"
            rows="6"
            placeholder=""
          />
          <MyTextArea
            label="Job Description "
            name="jobDescription"
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
            label="Benefits "
            name="benefits"
            rows="6"
            placeholder=""
          />
          <MyTextArea
            className="h-[50px] w-full bg-[#2596BE20] rounded-lg"
            label="Job Location "
            name="jobLocation"
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
    </div>
  );
};

export default postJobs;
