import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  fetchRequest,
  fetchRequestStats,
  resetUpdateState,
  setMultiCall,
  setUpdateSuccess,
  updateRequestStatus,
} from "../../../../Redux/RequestSlice";
import Spinner from "../../../../static/icons/wheel.svg";
import { toast } from "react-toastify";
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requestSlice.request);
  const stats = useSelector((state) => state.requestSlice.stats);
  const loading = useSelector((state) => state.requestSlice.loading);
  const error = useSelector((state) => state.requestSlice.error);
  const multiCall = useSelector((state) => state.requestSlice.multiCall);
  const updateSuccess = useSelector(
    (state) => state.requestSlice.updateSuccess
  );
  const updateError = useSelector((state) => state.requestSlice.updateError);

  const updateLoading = useSelector(
    (state) => state.requestSlice.updateLoading
  );
  const [statusModal, setStatusModal] = useState({
    open: false,
    id: null,
    status: "",
  });
  const [adminNote, setAdminNote] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const openStatusModal = (id, status) => {
    setStatusModal({ open: true, id, status });
  };

  useEffect(() => {
    dispatch(fetchRequest());
    dispatch(fetchRequestStats());
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      setStatusModal({
        open: false,
        id: null,
        status: "",
      });
      setAdminNote("");
      dispatch(setMultiCall(true));
      toast.success("Request Update Successful");

      dispatch(fetchRequest());
      dispatch(fetchRequestStats());
    }

    if (updateError) {
      dispatch(setMultiCall(false));
      toast.error("Failed to update request");
    }
    dispatch(resetUpdateState());
  }, [updateSuccess, updateError, multiCall]);

  const filteredRequests =
    statusFilter === "ALL"
      ? requests
      : requests.filter((item) => item.status === statusFilter);

  if (loading && !multiCall)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <img src={Spinner} className="w-16 h-16" alt="loading" />
      </div>
    );
  if (error) return <p className="p-6 text-red-500">{"Failed to fetch."}</p>;

  return (
    <div className="p-6 space-y-10">
      {/* ====================== STATS CARDS ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value={stats?.total} color="blue" />
        <StatCard title="Pending" value={stats?.pending} color="yellow" />
        <StatCard title="Approved" value={stats?.approved} color="green" />
        <StatCard title="Rejected" value={stats?.rejected} color="red" />
      </div>

      {/* ====================== FILTER ======================= */}
      <div className="flex items-center justify-between bg-white shadow p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Service Requests</h2>

        <select
          className="border rounded p-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* ====================== REQUESTS TABLE ======================= */}
      <div className="bg-white shadow rounded-lg  h-[350px] overflow-y-scroll">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <Th>Talent ID</Th>
              <Th>Provider ID</Th>
              <Th>Status</Th>
              <Th>Message</Th>
              <Th>Request Time</Th>

              <Th>Action</Th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests?.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No matching requests found.
                </td>
              </tr>
            )}

            {filteredRequests?.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <Td>{req.talentId}</Td>
                <Td>{req.providerId}</Td>

                <Td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : req.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                    {req.status}
                  </span>
                </Td>

                <Td>{req.message}</Td>
                <Td>{new Date(req.requestTime).toLocaleString()}</Td>

                <Td>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                      onClick={() => {
                        openStatusModal(req.id, "APPROVED"),
                          dispatch(setUpdateSuccess(false));
                      }}>
                      Approve
                    </button>

                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                      onClick={() => {
                        openStatusModal(req.id, "REJECTED"),
                          dispatch(setUpdateSuccess(false));
                      }}>
                      Reject
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Transition appear show={statusModal.open} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setStatusModal({ open: false, id: null, status: "" })}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-semibold mb-4">
                    {statusModal.status === "APPROVED"
                      ? "Approve Request"
                      : "Reject Request"}
                  </Dialog.Title>

                  <textarea
                    className="border w-full p-2 rounded mb-4"
                    rows={3}
                    placeholder="Admin note "
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={() =>
                        setStatusModal({
                          open: false,
                          id: null,
                          status: "",
                        })
                      }>
                      Cancel
                    </button>

                    <button
                      disabled={updateLoading}
                      className={`px-4 py-2 rounded text-white ${
                        statusModal.status === "APPROVED"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                      onClick={async () => {
                        if (adminNote === "") {
                          toast.error("Note is required");
                          return;
                        }
                        dispatch(
                          updateRequestStatus({
                            id: statusModal.id,
                            status: statusModal.status,
                            adminNote,
                          })
                        );
                      }}>
                      {updateLoading ? "Processing.." : "Confirm"}
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

/* ========================= COMPONENTS ========================= */

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-5 rounded-lg shadow bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${colors[color]}`}>{value}</h2>
    </div>
  );
};

const Th = ({ children }) => (
  <th className="text-left p-3 text-sm font-medium text-gray-700">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="p-3 text-sm text-gray-700 break-all">{children}</td>
);

export default Requests;
