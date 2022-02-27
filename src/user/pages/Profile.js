import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import ProfileEdit from '../components/ProfileEdit';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import Modal from '../../shared/components/ui/Modal';
import Button from '../../shared/components/ui/Button';
import AuthContext from '../../shared/context/auth-context';
import { useHttp } from '../../shared/hooks/use-http';

const Profile = () => {
  const iconRef = useRef();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const { token } = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const getUser = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/getMe`,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      setUser(user);
    } catch (err) {}
  }, [token, sendRequest]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const uploadIconHandler = async (e) => {
    const [file] = e.target.files;
    if (file) {
      let formData = new FormData();
      formData.append('photo', file);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/updateMe`,
          {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          'PATCH',
          formData
        );
        getUser();
      } catch (err) {}
    }
  };

  const clearIconHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateMe`,
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        'PATCH',
        { photo: null }
      );
      getUser();
    } catch (err) {}
  };

  return (
    <section>
      <h2 className="mb-6">
        <i className="fa-solid fa-circle-user mr-4"></i>個人資料
      </h2>
      <Modal
        onCancel={clearError}
        errorMsg={error?.message}
        show={!!error}
        content="抱歉，暫時未能讀取資料"
      />
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && !error && user && (
        <div className="grid sm:grid-cols-[max-content,max-content] gap-x-12 gap-y-10 items-center justify-center">
          <div className="grid grid-cols-1 justify-items-center gap-3 sm:border-b-0 sm:border-r-2 sm:border-sky-800 sm:border-dotted sm:pr-12">
            <div>
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/users/${user.icon}`}
                className="w-52 rounded-full object-contain"
                alt={user.name}
              />
            </div>
            <input
              className="hidden"
              ref={iconRef}
              type="file"
              accept="image/*"
              onChange={uploadIconHandler}
            />
            <Button className="w-40" onClick={() => iconRef.current.click()}>
              <i className="fa-solid fa-image-portrait"></i>更改頭像
            </Button>
            {user.icon !== 'default-icon.jpeg' && (
              <Button
                className="w-40"
                onClick={clearIconHandler}
                btnType="delete"
              >
                <i className="fa-regular fa-square-minus"></i>清除頭像
              </Button>
            )}
          </div>
          <>
            {edit ? (
              <ProfileEdit setEdit={setEdit} user={user} getUser={getUser} />
            ) : (
              <div className="grid grid-cols-[max-content,1fr] auto-rows-min gap-4 items-center">
                <h4>用戶名稱</h4>
                <p>{user.name}</p>
                <h4>電郵地址</h4>
                <p>{user.email}</p>
                <Button className="col-span-2" onClick={() => setEdit(true)}>
                  <i className="fa-solid fa-user-pen"></i>更改資料
                </Button>
              </div>
            )}
          </>
        </div>
      )}
    </section>
  );
};

export default Profile;
