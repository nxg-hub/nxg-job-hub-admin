import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import wheel from "../../../../../static/icons/wheel.svg";

const JobHandleBtn = ({ id, status }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [suspend, setSuspend] = useState(false);
  const [accept, setAccept] = useState(true);
  const [decline, setDecline] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [suspendReason, setSuspendReason] = useState("");
  const [rejectFormVisible, setRejectFormVisible] = useState(false);
  const [suspendFormVisible, setSuspendFormVisible] = useState(false);
  const jobID = id;

  const handleAccept = async () => {
    //sending request to accept job api
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/jobs/${jobID}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          location.reload();
        });
    } catch (err) {
      console.log(err, err.message);
    }
  };
  const handleDecline = () => {
    setRejectFormVisible(true);
    setAccept(false);
  };
  const rejectJob = () => {
        //sending request to reject job api
    try {
      setLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/jobs/${jobID}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
          body: JSON.stringify({ disapprovalReason: rejectReason }),
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
      console.log(err, err.message);
    }
  };
  const handleSubmitRejection = (event) => {
    event.preventDefault();
    rejectReason === "" ? null : rejectJob();
  };

  const handleSuspend = () => {
    console.log(jobID);
    setSuspendFormVisible(true);
    setDecline(false);
  };
  const suspendJob = () => {
        //sending request to suspend job api
    try {
      setLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/jobs/${jobID}/suspend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
          body: JSON.stringify({ suspensionReason: suspendReason }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSuspend(true);
          setSuspendFormVisible(false);
          setLoading(false);
          location.reload();
        });
    } catch (err) {
      console.log(err, err.message);
    }
  };
  const handleSubmitSuspension = (event) => {
    event.preventDefault();
    suspendReason === "" ? null : suspendJob();
  };

  return (
    <>
      {status === null ? (
        <button
          onClick={() => {
            handleAccept();
          }}
          className={`w-[45%] h-[32px] rounded-[8px] pb-[2px] bg-[#3B862F] text-white`}>
          Accept
          {loading && <img className="m-auto" src={wheel} />}
        </button>
      ) : null}

      {status === null ? (
        <button
          onClick={() => {
            handleDecline();
          }}
          className={`${
            decline
              ? " w-[45%] h-[32px] rounded-[8px] pb-[2px] border border-[#CB3C3C] text-[#CB3C3C]"
              : "hidden"
          }
          `}>
          Decline
          {loading && <img className="m-auto" src={wheel} />}
        </button>
      ) : null}
      {status === "ACCEPTED" && (
        <button
          onClick={() => {
            handleSuspend();
          }}
          className={`${status === "REJECTED" ? "hidden" : ""}  ${
            suspend ? "hidden" : ""
          } w-[45%] h-[32px] rounded-[8px] pb-[2px] bg-[#2596BE]  text-white hover:bg-blue-500`}>
          Suspend
          {loading && <img className="m-auto" src={wheel} />}
        </button>
      )}
      {status === "SUSPENDED" && (
        <button
          onClick={() => {
            handleAccept();
          }}
          className={`w-[55%] h-[32px] md:w-[45%]   rounded-[8px] pb-[2px] ] bg-green-800  text-white`}>
          Reactivate
          {loading && <img className="m-auto" src={wheel} />}
        </button>
      )}
      {status === "REJECTED" && (
        <button
          className={`${
            decline ? "block" : "hidden"
          } w-[45%] h-[32px]  rounded-[8px] pb-[2px] bg-red-700 text-white opacity-25 cursor-not-allowed`}>
          Declined
          {loading && <img className="m-auto" src={wheel} />}
        </button>
      )}
      {suspendFormVisible && (
        <form onSubmit={handleSubmitSuspension}>
          <label className="block">
            Reason for suspension:
            <input
              className="bg-[#2596BE20] rounded-md h-[50px] w-full px-2"
              type="text"
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
            />
          </label>
          <p className="text-sm text-red-700 text-center">
            {suspendReason === "" ? "required" : ""}
          </p>
          {loading && <img className="m-auto" src={wheel} />}
          <input
            className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white mt-3"
            type="submit"
          />
        </form>
      )}
      {rejectFormVisible && (
        <form onSubmit={handleSubmitRejection}>
          <label className="block">
            Reason for rejection:
            <input
              className="bg-[#2596BE20] rounded-md h-[50px] w-full px-2"
              type="text"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </label>
          <p className="text-sm text-red-700 text-center">
            {rejectReason === "" ? "required" : ""}
          </p>
          <input
            className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white mt-3"
            type="submit"
          />
        </form>
      )}
    </>
  );
};

export default JobHandleBtn;
