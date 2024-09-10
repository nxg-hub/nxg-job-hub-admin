import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

export const useApiRequest = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token.token,
        },
      })
        .then((response) => {
          if (response.status === 403) {
            navigate("/");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })

        .catch((error) => {
          setError(true);
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return { data, loading };
};
