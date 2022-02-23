import { useContext, useState } from 'react';
import AuthContext from '../../shared/context/auth-context';
import { useHttp } from '../../shared/hooks/use-http';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import Modal from '../../shared/components/ui/Modal';

const ProfileEdit = ({ setEdit, user, getUser }) => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { token } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    email: user.email,
    name: user.name,
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  };

  const validate = Yup.object({
    email: Yup.string().email('無效的電郵地址').required('電郵地址為必填'),
    name: Yup.string().required('用戶名稱為必填'),
    passwordCurrent: Yup.string().when('password', {
      is: (value) => value,
      then: Yup.string().required('更改密碼時需要現時密碼'),
      otherwise: Yup.string(),
    }),
    password: Yup.string().min(6, '密碼需要至少6位字元'),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref('password'), null],
      '確認新密碼與新密碼不符'
    ),
  });

  const submitHandler = async (values) => {
    const { name, email, passwordCurrent, password, passwordConfirm } = values;
    console.log(values);
    try {
      await sendRequest(
        `http://localhost:8000/api/users/updateMe`,
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        'PATCH',
        { name, email }
      );
    } catch (err) {}
    if (passwordCurrent && password && passwordConfirm) {
      try {
        await sendRequest(
          `http://localhost:8000/api/users/updatePassword`,
          {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          'PATCH',
          { passwordCurrent, password, passwordConfirm }
        );
      } catch (err) {}
    }
    setSuccess(true);
  };

  return (
    <>
      <Modal
        onCancel={() => {
          setSuccess(false);
          getUser();
          setEdit(false);
        }}
        successMsg="(若果涉及更改密碼，需重新登入)"
        show={success}
        content="更改成功！"
      />
      <Modal
        onCancel={clearError}
        errorMsg={error?.message}
        show={!!error}
        content="抱歉，暫時未能更新資料"
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitHandler(values)}
          validationSchema={validate}
        >
          {({ values, isValid }) => (
            <Form className="grid grid-cols-1 auto-rows-min gap-5">
              <div className="grid sm:flex gap-5 sm:gap-2">
                <Input
                  icon={<i className="fa-solid fa-signature"></i>}
                  label="用戶名稱"
                  name="name"
                  placeholder="用戶名稱"
                  value={values.name}
                />
                <Input
                  icon={<i className="fa-solid fa-at"></i>}
                  label="電郵地址"
                  name="email"
                  placeholder="電郵地址"
                  value={values.email}
                />
              </div>
              <h4 className="-mb-4">如要更改密碼，請填寫下列資料：</h4>
              <Input
                icon={<i className="fa-solid fa-lock"></i>}
                label="現時密碼"
                name="passwordCurrent"
                placeholder="現時密碼"
                autoComplete="new-password"
                value={values.passwordCurrent}
                type="password"
              />
              <Input
                icon={<i className="fa-solid fa-lock"></i>}
                label="新密碼"
                name="password"
                placeholder="新密碼"
                value={values.password}
                type="password"
              />
              <Input
                icon={<i className="fa-solid fa-lock"></i>}
                label="確認新密碼"
                name="passwordConfirm"
                placeholder="確認新密碼"
                value={values.passwordConfirm}
                type="password"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => setEdit(false)}
                  btnType="back"
                  type="button"
                >
                  返回
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid}
                  btnType={isValid ? '' : 'disabled'}
                >
                  <i className="fa-regular fa-square-check"></i>
                  提交更改
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProfileEdit;
