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
  const [disapprovalReason, setDisapprovalReason] = useState("");
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
          body: JSON.stringify({ disapprovalReason: disapprovalReason }),
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
    disapprovalReason === "" ? null : rejectJob();
  };

  const handleSuspend = () => {
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
          body: JSON.stringify({ reasonForJobSuspension: suspendReason }),
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
      {status === "PENDING" ? (
        <button
          onClick={() => {
            handleAccept();
          }}
          className={`w-[45%] h-[32px] rounded-[8px] pb-[2px] bg-[#3B862F] text-white`}>
          Accept
          {loading && <img className="m-auto" src={wheel} />}
        </button>
      ) : null}

      {status === "PENDING" ? (
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
        // <button
        //   onClick={() => {
        //     handleAccept();
        //   }}
        //   className={`w-[55%] h-[32px] md:w-[45%]   rounded-[8px] pb-[2px] ] bg-green-800  text-white`}>
        //   Reactivate
        //   {loading && <img className="m-auto" src={wheel} />}
        // </button>
      )}
      {suspendFormVisible && (
        <>
          <form
            className="absolute top-[200px] w-[88%] left-[3%] lg:w-[50%] lg:left-[25%] bg-white z-30 py-4"
            onSubmit={handleSubmitSuspension}>
            <label className="block font-bold text-center">
              Reason for suspension:
              <input
                className="bg-[#2596BE20] rounded-md m-auto  h-[50px] w-[80%] px-2"
                type="text"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
              />
            </label>
            <p className="text-sm text-red-700 text-center">
              {suspendReason === "" ? "required" : ""}
            </p>
            {loading && <img className="m-auto" src={wheel} />}

            <button
              className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white mt-3"
              type="submit">
              {loading ? "Submitting..." : "Submit"}
            </button>
            <span
              onClick={() => {
                setSuspendFormVisible(false);
              }}
              className="text-2xl font-bold text-red-500 absolute top-2 right-2 cursor-pointer">
              x
            </span>
          </form>
          <div
            onClick={() => {
              setSuspendFormVisible(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
      {rejectFormVisible && (
        <>
          <form
            className="absolute top-[200px] w-[88%] left-[3%] lg:w-[50%] lg:left-[25%] bg-white z-30 py-4"
            onSubmit={handleSubmitRejection}>
            <label className="block text-center font-bold">
              Reason for rejection:
            </label>
            <input
              className="bg-[#2596BE20] rounded-md m-auto ml-[10%] h-[50px] w-[80%] px-2"
              type="text"
              value={disapprovalReason}
              onChange={(e) => setDisapprovalReason(e.target.value)}
            />
            <p className="text-sm text-red-700 text-center font-bold">
              {disapprovalReason === "" ? "required" : ""}
            </p>
            <button
              className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white mt-3"
              type="submit">
              Submit
            </button>
            <span
              onClick={() => {
                setRejectFormVisible(false);
              }}
              className="text-2xl font-bold text-red-500 absolute top-2 right-2 cursor-pointer">
              x
            </span>
          </form>
          <div
            onClick={() => {
              setRejectFormVisible(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
    </>
  );
};

export default JobHandleBtn;
