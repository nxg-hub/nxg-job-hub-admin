import React, { useState } from "react";

const Button = ({ id }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [suspend, setSuspend] = useState(false);

  const handleSuspend = () => {
    try {
      // setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/suspend`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSuspend(true);
          // setIsLoading(false);
        });
    } catch (err) {
      console.log(err, err.message);
    }
  };

  return (
    <button
      onClick={() => {
        handleSuspend();
      }}
      className={suspend ? "reactivate-btn" : ""}>
      {suspend ? "Reactivate" : "Suspend"}
    </button>
  );
};

export default Button;
