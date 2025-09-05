import { useEffect, useState } from "react";
import API from "../services/api";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    API.request({ url, method: options.method || "GET", data: options.body || undefined })
      .then((res) => { if (mounted) setData(res.data); })
      .catch((err) => { if (mounted) setError(err); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [url]);

  return { data, loading, error };
}
