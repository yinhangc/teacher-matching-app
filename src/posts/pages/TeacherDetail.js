import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useEffect, useState } from 'react';
import { unescape } from 'lodash';
import { useHttp } from '../../shared/hooks/use-http';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import Modal from '../../shared/components/ui/Modal';
import ViewEditor from '../../shared/components/ui/ViewEditor';
import Swiper from '../../shared/components/ui/Swiper';

// prettier-ignore
const timeOption = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日','公眾假期'];
// prettier-ignore
const regionOption = ['中西區','灣仔區','東區','南區','九龍城區','深水埗區','油尖旺區','黃大仙區','觀塘區','北區','西貢區','沙田區','大埔區','離島區','葵青區','荃灣區','屯門區','元朗區']

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const {
          data: { post },
        } = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`
        );
        post.description = unescape(post.description);
        post.region = post.region
          .sort((a, b) => regionOption.indexOf(a) - regionOption.indexOf(b))
          .join(', ');
        post.time = post.time
          .sort((a, b) => timeOption.indexOf(a) - timeOption.indexOf(b))
          .join(', ');
        setTeacher(post);
      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequest, id]);

  return (
    <>
      <Modal
        onCancel={clearError}
        errorMsg={error}
        show={!!error}
        content="抱歉，暫時未能加載資料"
      />
      <section id="teacher-detail" className="grid gap-6">
        {isLoading && !teacher && <LoadingSpinner />}
        {!isLoading && !error && teacher && (
          <>
            {teacher.images.length > 0 ? (
              <Swiper>
                <div>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/posts/${teacher.imageCover}`}
                    alt={teacher.creator.name}
                  />
                </div>
                {teacher.images.map((img) => (
                  <div key={img}>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/posts/${img}`}
                      alt={teacher.creator.name}
                    />
                  </div>
                ))}
              </Swiper>
            ) : (
              <div>
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/posts/${teacher.imageCover}`}
                  alt={teacher.creator.name}
                />
              </div>
            )}
            <h2>{teacher.title}</h2>
            <div>
              <h3 className="mb-2 text-sky-900">
                <i className="fa-solid fa-phone mr-4"></i>聯絡電話
              </h3>
              <p>{teacher.phone}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sky-900">
                <i className="fa-solid fa-clock mr-4"></i>時間
              </h3>
              <p>{teacher.time}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sky-900">
                <i className="fa-solid fa-map-location-dot mr-4"></i>地區
              </h3>
              <p>{teacher.region}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sky-900">
                <i className="fa-solid fa-pencil mr-4"></i>詳細資料
              </h3>
              <ViewEditor viewText={teacher.description} />
            </div>
          </>
        )}
        <Button
          btnType="back"
          className="place-self-end"
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
      </section>
    </>
  );
};

export default TeacherDetail;
