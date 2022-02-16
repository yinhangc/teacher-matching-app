import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useEffect, useState } from 'react';
import Editor from '../../shared/components/ui/Editor';
import { unescape } from 'lodash';
import { useHttp } from '../../shared/hooks/use-http';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import Modal from '../../shared/components/ui/Modal';

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const { post } = await sendRequest(
          `http://localhost:8000/api/posts/${id}`
        );
        post.description = unescape(post.description);
        post.region = post.region.join(', ');
        post.time = post.time.join(', ');
        console.log(post);
        setTeacher(post);
      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequest]);

  return (
    <>
      <Modal
        onCancel={clearError}
        show={error}
        className="text-center grid place-items-center gap-1"
      >
        <h3>抱歉，暫時未能加載資料</h3>
        <p>({error})</p>
        <Button onClick={clearError} className="w-40 mt-3">
          OK
        </Button>
      </Modal>
      <section id="teacher-detail" className="grid gap-5">
        {isLoading && !teacher && <LoadingSpinner />}
        {!isLoading && !error && teacher && (
          <>
            <div>
              <img
                src={`http://localhost:8000/public/img/posts/${teacher.imageCover}`}
                // alt={teacher.creator.name}
              />
            </div>
            <h2>{teacher.title}</h2>
            <div>
              <h3 className="mb-1 text-sky-900">聯絡電話</h3>
              <p>{teacher.phone}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sky-900">時間</h3>
              <p>{teacher.time}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sky-900">地區</h3>
              <p>{teacher.region}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sky-900">詳細資料</h3>
              <Editor viewText={teacher.description} />
            </div>
          </>
        )}
        <Button
          btnType="back"
          className="place-self-end"
          onClick={() => navigate('/')}
        >
          返回
        </Button>
      </section>
    </>
  );
};

export default TeacherDetail;
