import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);

  const activeHttpReq = useRef([]);

  useEffect(() => {
    return () => {
      activeHttpReq.current.forEach((el) => el.abort());
    };
  }, []);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpReq.current.push(httpAbortController);
      try {
        const res = await axios({
          method,
          url,
          headers,
          body,
          signal: httpAbortController.signal,
        });
        const data = res.data.data;
        setIsLoading(false);
        return data;
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
