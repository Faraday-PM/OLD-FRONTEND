import { useState, useEffect } from "react";

type FaviconResponseModel = {
  status: Number;
  statusText: String;
  msg: String;
  error: any;
  loading: Boolean;
};

export const useFavicon = (url: string): FaviconResponseModel => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<String>("");

  const getFavicon = async () => {
    try {
      const res = await fetch("http://192.168.2.198:8000/favicon", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          url: url,
        }),
      });
      await res.json().then((result) => {
        setMsg(result.msg);
      });
      setStatus(res.status);
      setStatusText(res.statusText);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFavicon();
  }, []);

  return { status, statusText, msg, error, loading };
};
