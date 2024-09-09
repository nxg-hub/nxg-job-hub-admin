import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../Redux/SubsriptionSlice";
import Spinner from "../../../../static/icons/wheel.svg";
import avater from "../../../../static/images/userIcon.png";

const Subscription = () => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const loading = useSelector((state) => state.SubsriptionSlice.loading);
  const error = useSelector((state) => state.SubsriptionSlice.error);

  useEffect(() => {
    //fetching user subscriptions and displaying them on the ui
    dispatch(
      fetchSub("/api/v1/admin/subscriptions?page=0&size=100&sort=string")
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
          <Link
            to={"/dashboard"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              fontWeight: "400",
              color: "#000",
              margin: "0 0 1rem 1rem",
              paddingTop: ".5rem",
            }}>
            <BsArrowLeft style={{ fontSize: "26px" }} />
            <span>Back</span>
          </Link>

          <div className="relative overflow-x-auto overflow-y-scroll h-[90vh] w-[90%] m-auto border rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Plan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Renewal Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s, i) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={i}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center gap-3 font-bold">
                        <img
                          className="w-[40px] rounded-full"
                          src={
                            s.user.profilePicture
                              ? `${s.user.profilePicture}`
                              : avater
                          }
                          alt="pic"
                        />
                        {s.user.name}
                      </div>
                    </th>
                    <td className="mx-12 py-4">{s.email}</td>
                    <td className="px-10 py-4">{s.user.userType}</td>
                    <td className="px-6 py-4">{s.planType}</td>
                    <td
                      className={
                        s.subscriptionStatus === "ACTIVE"
                          ? "text-green-500 px-6 py-4"
                          : "text-red-500 px-6 py-4"
                      }>
                      {s.subscriptionStatus}
                    </td>
                    <td className="px-6 py-4">{s.subscriptionDues}</td>
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

export default Subscription;
