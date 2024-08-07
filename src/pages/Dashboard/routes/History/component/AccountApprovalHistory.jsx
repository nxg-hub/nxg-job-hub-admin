import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { fetchAccHistory } from "../../../../../Redux/AccountHistorySlice";
import moment from "moment/moment";
const AccountApprovalHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.AccountHistorySlice.history);
  const loading = useSelector((state) => state.AccountHistorySlice.loading);
  const error = useSelector((state) => state.AccountHistorySlice.error);

  useEffect(() => {
    //fetching account approval/disapproval history and displaying it on the UI
    dispatch(
      fetchAccHistory(
        "/api/v1/admin/approval-history/employer?page=0&size=1000"
      )
    );
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <img
          src={Spinner}
          className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto overflow-y-scroll h-[80vh] w-[90%] m-auto border rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Approval Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Approval Officer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Approval
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Disapproval Reason
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Disapproval
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((s) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={s.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {s.userType}
                    </th>
                    <td className="px-6 py-4">{s.approvalType}</td>
                    <td className="px-6 py-4">{s.employerName}</td>
                    <td className="px-6 py-4">{s.approvalOfficerName}</td>
                    <td className="px-6 py-4">
                      {moment(s.dateOfApproval).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className={`px-6 py-4`}>{s.disapprovalReason}</td>
                    <td className="px-6 py-4">{s.dateOfDisapproval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountApprovalHistory;
