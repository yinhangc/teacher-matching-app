import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import axios from 'axios';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const activeHttpReq = useRef([]);

  useEffect(() => {
    const activeReqCurrent = activeHttpReq.current;
    return () => {
      activeReqCurrent.forEach((el) => el.abort());
    };
  }, []);

  const sendRequest = useCallback(
    async (url, headers = {}, method = 'GET', body = null) => {
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
        if (err.response.data.error.statusCode === 401) {
          logout();
          navigate('/auth');
        }
      }
    },
    [logout]
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
