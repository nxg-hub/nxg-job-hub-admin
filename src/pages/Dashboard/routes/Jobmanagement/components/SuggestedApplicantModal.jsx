import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTalentID } from "../../../../../Redux/JobSlice";
import { fetchApplicants } from "../../../../../Redux/ApplicantSlice";

const SuggestedApplicantModal = ({ id }) => {
  let [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const suggestedApp = useSelector((state) => state.ApplicantSlice.applicants);
  const loading = useSelector((state) => state.ApplicantSlice.loading);
  //fetching suggested applicants
  useEffect(() => {
    dispatch(fetchApplicants(`/api/v1/admin/job/${id}/suggested-applicants`));
  }, []);
  const handleReview = (id) => {
    dispatch(getTalentID(id));
  };
  const pendingApplicants = suggestedApp?.filter(
    (app) => app.applicationStatus === "PENDING"
  );
  return (
    <div className="m-auto">
      {/* <div className=" inset-0 flex items-center justify-center fixed ">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          See Suggested Applicants
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 m-auto" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center overflow-y-scroll ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md h-[300px] md:h-[400px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Suggested Applicants
                  </Dialog.Title>
                  {loading ? (
                    <h2 className="font-bold mt-4">Loading Applicants.....</h2>
                  ) : pendingApplicants.length > 0 ? (
                    pendingApplicants.map((app) => (
                      <div className="w-[100%] flex mt-2 justify-between items-center shadow-sm shadow-[#00000040] py-1 ">
                        <div className="flex">
                          <img
                            className="w-[64px] h-[64px] rounded-full"
                            src={app.techTalent.profilePicture}
                            alt={`profilePic`}></img>
                          <li className="text-[16px] font- py-2">
                            <h3>
                              Name:
                              <span className="font-bold px-1 capitalize">
                                {app.applicant.firstName}
                              </span>
                            </h3>
                            <h3>
                              Matching Score:
                              <span className="font-bold px-1">
                                {app.matchingScore}
                              </span>
                            </h3>
                          </li>
                        </div>
                        <Link
                          to={`../review-appliedtalent/${app.applicationId}`}>
                          <button
                            className="bg-[#2596BE] text-white txt-sm px-2 md:px-3 py-2 mr-5 md:mr-0  h-[40px] rounded-lg"
                            onClick={() => handleReview(app.applicant.id)}>
                            Review
                          </button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <h2 className="font-bold mt-3">
                      No Suggested Applicant At The Moment.
                    </h2>
                  )}

                  <div className="mt-[120px] md:mt-[220px]">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}>
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SuggestedApplicantModal;
