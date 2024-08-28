import { useField } from "formik";
import React from "react";

const MyInput = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="block w-[90%] m-auto ">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={`bg-[#2596BE20] w-full rounded-lg h-[150px] `}
        {...field}
        {...props}>
        {value}
      </input>
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyInput;
