import React, { useState } from "react";
import wheel from "../../../../../../static/icons/wheel.svg";
import { toast } from "react-toastify";

const CardBtn = ({ id, restrict }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [loading, setLoading] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState("");
  const [reactivateReason, setReactivateReason] = useState("");
  const [suspendformVisible, setSuspendFormVisible] = useState(false);
  const [rejectFormVisible, setRejectFormVisible] = useState(false);

  const handleSubmitSuspend = (event) => {
    event.preventDefault();
    suspensionReason === "" ? null : suspendUser();
  };
  const handleSubmitReject = (event) => {
    event.preventDefault();
    reactivateReason === "" ? null : reactivateUser();
  };
  const handleSuspend = () => {
    setSuspendFormVisible(true);
  };
  const handleReject = () => {
    setRejectFormVisible(true);
  };

  const suspendUser = async () => {
    //Calling the endPoint to suspend a user
    setLoading(true);
    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/suspend`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
          body: JSON.stringify({
            reasonForProfileSuspension: suspensionReason,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSuspendFormVisible(false);
          setLoading(false);
          location.reload();
        });
    } catch (err) {
      console.log("error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const reactivateUser = async () => {
    //calling the endPoint to reactivate a suspended user
    setLoading(true);
    try {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/users/${id}/reactivate/remove-suspension`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
          body: JSON.stringify({
            reasonForProfileReactivation: reactivateReason,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRejectFormVisible(false);
          setLoading(false);
          location.reload();
        });
    } catch (err) {
      console.log("error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <>
        {restrict && (
          <button
            onClick={() => {
              handleSuspend();
            }}
            className={`w-full border border-[#cb3c3c] rounded-lg bg-transparent p-[10px] shadow-lg font-bold text-[#cb3c3c] m-auto`}>
            suspend
          </button>
        )}
        {!restrict && (
          <button
            onClick={() => {
              handleReject();
            }}
            className={`w-full border-none rounded-lg bg-[#3b862f] p-[10px] shadow-lg font-bold text-[#fff] m-auto reactivate-btn`}>
            reactivate
          </button>
        )}
      </>

      {suspendformVisible && (
        <form className="space-y-2 form" onSubmit={handleSubmitSuspend}>
          <label className="block mt-11 md:mt-3">
            Reason for suspension:
            <input
              className="bg-[#2596BE20] rounded-md h-[50px] w-full px-2"
              type="text"
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
            />
          </label>
          <p className="text-sm text-red-700">
            {suspensionReason === "" ? "required" : ""}
          </p>
          {loading && <img className="m-auto" src={wheel} />}
          <input
            className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white"
            type="submit"
          />
        </form>
      )}
      {rejectFormVisible && (
        <form className="space-y-2  m-auto " onSubmit={handleSubmitReject}>
          <label className="block mt-3">
            Reason for Reactivation:
            <input
              className="bg-[#2596BE20] rounded-md h-[50px] w-full px-2"
              type="text"
              value={reactivateReason}
              onChange={(e) => setReactivateReason(e.target.value)}
            />
          </label>
          <p className="text-sm text-red-700">
            {reactivateReason === "" ? "required" : ""}
          </p>
          {loading && <img className="m-auto" src={wheel} />}
          <input
            className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white mt-2"
            type="submit"
          />
        </form>
      )}
    </>
  );
};

export default CardBtn;
