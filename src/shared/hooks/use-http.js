import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const activeHttpReq = useRef([]);

  useEffect(() => {
    const activeReqCurrent = activeHttpReq.current;
    return () => {
      activeReqCurrent.forEach((el) => el.abort());
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
          data: body,
          signal: httpAbortController.signal,
        });
        const data = res.data;
        setIsLoading(false);
        return data;
      } catch (err) {
        console.log(err.response.data);
        setError(err.response.data);
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
