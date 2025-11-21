// import React, { useState } from "react";
// import wheel from "../../../../../../static/icons/wheel.svg";
// import { toast } from "react-toastify";

// const CardBtn = ({ id, restrict }) => {
//   const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
//   const [loading, setLoading] = useState(false);
//   const [suspensionReason, setSuspensionReason] = useState("");
//   const [reactivateReason, setReactivateReason] = useState("");
//   const [suspendformVisible, setSuspendFormVisible] = useState(false);
//   const [rejectFormVisible, setRejectFormVisible] = useState(false);

//   const handleSubmitSuspend = (event) => {
//     event.preventDefault();
//     suspensionReason === "" ? null : suspendUser();
//   };
//   const handleSubmitReject = (event) => {
//     event.preventDefault();
//     reactivateUser();
//   };
//   const handleSuspend = () => {
//     setSuspendFormVisible(true);
//   };
//   const handleReject = () => {
//     setRejectFormVisible(true);
//   };

//   const suspendUser = async () => {
//     //Calling the endPoint to suspend a user
//     setLoading(true);
//     try {
//       await fetch(
//         `${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/suspend`,

//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
//             Authorization: token,
//           },
//           body: JSON.stringify({
//             reasonForProfileSuspension: suspensionReason,
//           }),
//         }
//       )
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           setSuspendFormVisible(false);
//           setLoading(false);
//           location.reload();
//         });
//     } catch (err) {
//       console.log("error:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reactivateUser = async () => {
//     //calling the endPoint to reactivate a suspended user
//     setLoading(true);
//     try {
//       await fetch(
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/api/v1/admin/users/${id}/reactivate/remove-suspension`,

//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
//             Authorization: token,
//           },
//           body: JSON.stringify({
//             reasonForProfileReactivation: reactivateReason,
//           }),
//         }
//       )
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           setRejectFormVisible(false);
//           setLoading(false);
//           location.reload();
//         });
//     } catch (err) {
//       console.log("error:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const closeRejectForm = () => {
//     setRejectFormVisible(false);
//   };
//   const closeSuspendForm = () => {
//     setSuspendFormVisible(false);
//   };
//   return (
//     <>
//       <>
//         {restrict && (
//           <button
//             onClick={() => {
//               handleSuspend();
//             }}
//             className={`w-full border border-[#cb3c3c] rounded-lg bg-transparent p-[10px] shadow-lg font-bold text-[#cb3c3c] m-auto`}>
//             suspend
//           </button>
//         )}
//         {!restrict && (
//           <button
//             onClick={() => {
//               handleReject();
//             }}
//             className={`w-full border-none rounded-lg bg-[#3b862f] p-[10px] shadow-lg font-bold text-[#fff] m-auto reactivate-btn`}>
//             reactivate
//           </button>
//         )}
//       </>

//       {suspendformVisible && (
//         <form
//           className="space-y-2 form relative"
//           onSubmit={handleSubmitSuspend}>
//           <label className="block mt-11 md:mt-3">
//             Reason for suspension:
//             <input
//               className="bg-[#2596BE20] rounded-md h-[50px] w-full px-2"
//               type="text"
//               value={suspensionReason}
//               onChange={(e) => setSuspensionReason(e.target.value)}
//             />
//           </label>
//           <p className="text-sm text-red-700">
//             {suspensionReason === "" ? "required" : ""}
//           </p>
//           {loading && <img className="m-auto" src={wheel} />}
//           <input
//             className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white"
//             type="submit"
//           />
//           {suspendformVisible && (
//             <span
//               onClick={closeSuspendForm}
//               className="text-white cursor-pointer bg-red-700 px-1 absolute rounded-md bottom-0 right-0">
//               x
//             </span>
//           )}
//         </form>
//       )}
//       {rejectFormVisible && (
//         <form
//           className="space-y-2  m-auto relative "
//           onSubmit={handleSubmitReject}>
//           <label className="block mt-3">
//             Reason for Reactivation:
//             <input
//               className="bg-[#2596BE20] rounded-md h-[50px] w-full px-2"
//               type="text"
//               value={reactivateReason}
//               onChange={(e) => setReactivateReason(e.target.value)}
//             />
//           </label>
//           <p className="text-sm text-red-700">
//             {reactivateReason === "" ? "required" : ""}
//           </p>
//           {loading && <img className="m-auto" src={wheel} />}
//           <input
//             className="block m-auto bg-[#006A90] px-4 py-2 rounded-md text-white mt-2"
//             type="submit"
//           />
//           {rejectFormVisible && (
//             <span
//               onClick={closeRejectForm}
//               className="text-white cursor-pointer bg-red-700 px-1 absolute rounded-md bottom-0 right-0">
//               x
//             </span>
//           )}
//         </form>
//       )}
//     </>
//   );
// };

// export default CardBtn;

import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import wheel from "../../../../../../static/icons/wheel.svg";
import { useDispatch } from "react-redux";
import { fetchTalent } from "../../../../../../Redux/TalentSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CardBtn = ({ id, restrict }) => {
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setReason("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!reason) return;

    setLoading(true);
    const url = restrict
      ? `${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/suspend`
      : `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/users/${id}/reactivate/remove-suspension`;

    const body = restrict
      ? { reasonForProfileSuspension: reason }
      : { reasonForProfileReactivation: reason };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
        body: JSON.stringify(body),
      });
      await res.json();

      dispatch(fetchTalent({ page: 0, size: 10000 }));
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
      toast(`${restrict ? "User Suspended" : "User Reactivated"}`);
      navigate("/dashboard");
    } catch (err) {
      console.log("error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`w-full rounded-lg p-2 font-bold shadow-lg ${
          restrict
            ? "border border-red-600 text-red-600 bg-transparent"
            : "bg-green-600 text-white"
        }`}>
        {restrict ? "Suspend" : "Reactivate"}
      </button>

      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    {restrict ? "Suspend User" : "Reactivate User"}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <label className="block">
                      Reason:
                      <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                      />
                    </label>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        disabled={loading}
                        className="px-4 py-2 bg-gray-300 rounded-md">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-md text-white ${
                          restrict ? "bg-red-600" : "bg-green-600"
                        }`}>
                        {!loading && (restrict ? "Suspend" : "Reactivate")}
                        {loading && "Processing..."}
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

export default CardBtn;
