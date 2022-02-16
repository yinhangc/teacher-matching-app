import TeachersList from '../components/TeachersList';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useContext } from 'react';
import AuthContext from '../../shared/context/auth-context';
import Modal from '../../shared/components/ui/Modal';
import { useEffect, useState } from 'react/cjs/react.development';
import { useHttp } from '../../shared/hooks/use-http';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';

const Teachers = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { posts } = await sendRequest(`http://localhost:8000/api/posts`);
        setTeachers(posts);
      } catch (err) {}
    };
    fetchTeachers();
  }, [sendRequest]);

  return (
    <>
      <Modal
        onCancel={clearError}
        show={error}
        className="text-center grid place-items-center gap-1"
      ></Modal>
      {isLoading && !teachers && <LoadingSpinner />}
      {!isLoading && !error && teachers && (
        <section className="grid gap-3">
          {!isLoggedIn && (
            <Button
              btnType="grey"
              className="inline-block place-self-end"
              onClick={() => navigate('/auth')}
            >
              請登入/註冊以刊登
            </Button>
          )}
          <TeachersList items={teachers} />
        </section>
      )}
    </>
  );
};

export default Teachers;