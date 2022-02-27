import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import AuthContext from '../../shared/context/auth-context';
import { useHttp } from '../../shared/hooks/use-http';
import TeachersList from '../components/TeachersList';
import TeacherFilter from '../components/TeacherFilter';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import Button from '../../shared/components/ui/Button';
import Modal from '../../shared/components/ui/Modal';
import Pagination from '../../shared/components/ui/Pagination';

const limit = 4;

const Teachers = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [totalPosts, setTotalPosts] = useState();
  const [currPageNum, setCurrPageNum] = useState(1);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const fetchTeachers = useCallback(
    async (queryObj) => {
      try {
        const {
          data: { posts },
          total,
        } = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts`,
          {},
          'GET',
          null,
          queryObj
        );
        setTeachers(posts);
        setTotalPosts(total);
      } catch (err) {}
    },
    [sendRequest]
  );

  useEffect(() => {
    const queryObj = { limit };
    for (const [key, value] of searchParams.entries()) {
      queryObj[key] = value;
    }
    searchParams.get('page')
      ? setCurrPageNum(parseInt(searchParams.get('page')))
      : setCurrPageNum(1);
    if (pathname === '/') fetchTeachers(queryObj);
  }, [fetchTeachers, pathname, searchParams]);

  return (
    <>
      <Modal
        onCancel={clearError}
        errorMsg={error}
        show={!!error}
        content="抱歉，暫時未能加載資料"
      />
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && !error && teachers && (
        <section className="grid gap-3 auto-rows-min">
          {!isLoggedIn && (
            <Button
              btnType="grey"
              className="inline-block place-self-end"
              onClick={() => navigate('/auth')}
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              請登入/註冊以刊登
            </Button>
          )}
          <TeacherFilter />
          <Pagination
            totalPageNum={Math.ceil(totalPosts / limit)}
            currPageNum={currPageNum}
          />
          {teachers.length > 0 ? (
            <TeachersList items={teachers} />
          ) : (
            <p className="p-4 text-center text-lg font-bold border rounded-lg">
              暫時沒有相關資料
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default Teachers;
