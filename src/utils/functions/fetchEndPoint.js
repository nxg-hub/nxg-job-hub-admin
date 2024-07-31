import { useEffect, useState } from "react";

const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

export const useApiRequest = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { data };
};
