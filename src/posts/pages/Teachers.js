import TeachersList from '../components/TeachersList';
import TeacherFilter from '../components/TeacherFilter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useContext, useCallback, useEffect, useState } from 'react';
import AuthContext from '../../shared/context/auth-context';
import Modal from '../../shared/components/ui/Modal';
import { useHttp } from '../../shared/hooks/use-http';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';

const Teachers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const fetchTeachers = useCallback(async () => {
    const queryObj = {};
    for (const [key, value] of searchParams.entries()) {
      queryObj[key] = value;
    }
    try {
      const {
        data: { posts },
      } = await sendRequest(
        `http://localhost:8000/api/posts`,
        {},
        'GET',
        null,
        queryObj
      );
      setTeachers(posts);
    } catch (err) {}
  }, [sendRequest, searchParams]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <>
      <Modal
        onCancel={clearError}
        errorMsg={error?.message}
        show={!!error}
        content="抱歉，暫時未能加載資料"
      />
      {isLoading && !teachers && <LoadingSpinner />}
      {!isLoading && !error && teachers && (
        <section className="grid gap-5">
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
          <TeachersList items={teachers} />
        </section>
      )}
    </>
  );
};

export default Teachers;
