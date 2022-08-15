import { useState, useEffect } from "react";

const API_URL = "http://localhost:4000/api";

type FetchStatus = "idle" | "success" | "loading" | "error";

export interface Product {
  name: string;
  price: string;
  owner: string;
  last_bidder?: string;
}

export default function useFetchProducts() {
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    (async function fetchProducts() {
      try {
        setStatus("loading");

        const res = await fetch(API_URL);
        const data = await res.json();

        setData(data.products);
        setStatus("success");
      } catch (e) {
        console.trace(e);
        setError(e);
        setStatus("error");
      }
    })();

    return () => {
      setStatus("idle");
      setData([]);
    };
  }, []);

  return {
    data,
    status,
    error,
  };
}
