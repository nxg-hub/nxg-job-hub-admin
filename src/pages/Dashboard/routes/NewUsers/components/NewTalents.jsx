import React, { useEffect, useState } from "react";
import Spinner from "../../../../../static/icons/wheel.svg";
import moment from "moment/moment";

const NewTalents = () => {
  const [loading, setLoading] = useState(false);
  const [talent, setTalent] = useState([]);
  const [error, setError] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  useEffect(() => {
    //fetching new users and displaying them on the ui
    try {
      setLoading(true);
      fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/new-talents-in-the-one-past-week?page=0&size=10000`,

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
          setTalent(data.content);
          setLoading(false);
        });
    } catch (err) {
      console.log("error:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
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
                    Talent Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Talent Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Interest
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {talent.map((user) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={user.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center gap-3 font-bold">
                        {user.talentName}
                      </div>
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.jobInterest}</td>
                    <td className="px-6 py-4">
                      {moment(user.dateJoined).format("DD/MM/YYYY HH:mm")}
                    </td>
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

export default NewTalents;
