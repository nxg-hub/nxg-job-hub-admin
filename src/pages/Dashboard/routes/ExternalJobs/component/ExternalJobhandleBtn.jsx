import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import wheel from "../../../../../static/icons/wheel.svg";
import { fetchExternalJobs } from "../../../../../Redux/ExternalJobSlice";
import { useDispatch } from "react-redux";

const ExternalJobhandleBtn = ({ id, status }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [modalType, setModalType] = useState(""); // "reject" | "suspend" | "reactivate"
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const apiCall = async (endpoint, payload = {}) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Action successful!.");
        dispatch(fetchExternalJobs("/api/v1/job-posts"));
      } else {
        toast.error("Something went wrong. Try again!");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Network error!");
      setLoading(false);
    }
  };

  const handleAccept = () => {
    apiCall(`/api/v1/admin/jobs/${id}/accept-external-job`);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    if (modalType === "reject")
      apiCall(`/api/v1/admin/jobs/${id}/reject-external-job`, {
        disapprovalReason: reason,
      });
    if (modalType === "suspend")
      apiCall(`/api/v1/admin/jobs/${id}/suspend-external-job`, {
        reasonForJobSuspension: reason,
      });
    if (modalType === "reactivate")
      apiCall(
        `/api/v1/admin/job/reactivate-external-job/${id}?reactivationReason=${reason}`,
        { reactivationReason: reason }
      );
    setReason("");
    setModalType("");
  };

  return (
    <>
      {" "}
      <div className="flex gap-2">
        {status === "PENDING" && (
          <>
            {" "}
            <button
              onClick={handleAccept}
              disabled={loading}
              className="flex-1 h-10 rounded-md px-5 bg-green-600 text-white hover:bg-green-700 relative">
              {loading ? "Processing..." : "Accept"}{" "}
            </button>
            <button
              onClick={() => setModalType("reject")}
              disabled={loading}
              className="flex-1 h-10 rounded-md px-5 border border-red-600 text-red-600 hover:bg-red-50">
              Decline{" "}
            </button>
          </>
        )}
        {status === "ACCEPTED" && (
          <button
            onClick={() => setModalType("suspend")}
            disabled={loading}
            className="flex-1 h-10 rounded-md bg-[#2596be] px-5 text-white hover:bg-blue-500">
            Suspend{" "}
          </button>
        )}
        {status === "SUSPENDED" && (
          <button
            onClick={() => setModalType("reactivate")}
            disabled={loading}
            className="flex-1 h-10 px-5 rounded-md bg-green-700 text-white hover:bg-green-800">
            Reactivate{" "}
          </button>
        )}{" "}
      </div>
      ```
      <Transition appear show={modalType !== ""} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setModalType("")}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center">
                    {modalType === "reject" && "Reason for Rejection"}
                    {modalType === "suspend" && "Reason for Suspension"}
                    {modalType === "reactivate" && "Reason for Reactivation"}
                  </Dialog.Title>
                  <form
                    onSubmit={handleModalSubmit}
                    className="mt-4 flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Enter reason..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                        onClick={() => setModalType("")}>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                        {loading && <img src={wheel} className="w-5" />}
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ExternalJobhandleBtn;
