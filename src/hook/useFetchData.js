import React, { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const key = import.meta.env.VITE_SOME_KEY;

  const fetchCoinData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": key,
      },
    };

    setLoading(true);
    setError(null);

    console.log("Fetching data...");

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchCoinData();
  }, [url]);

  return [data, loading, error];
};

export default useFetchData;
