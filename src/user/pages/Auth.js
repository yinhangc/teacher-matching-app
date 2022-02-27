import Input from '../../shared/components/ui/Input';
import Button from '../../shared/components/ui/Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import logo from '../../assets/logo.png';
import AuthContext from '../../shared/context/auth-context';
import { useContext, useState } from 'react';
import { useHttp } from '../../shared/hooks/use-http';
import Modal from '../../shared/components/ui/Modal';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [signup, setSignup] = useState(false);
  const { sendRequest, error, isLoading, clearError } = useHttp();

  const validate = signup
    ? Yup.object({
        name: Yup.string().required('用戶名為必填'),
        email: Yup.string().email('無效的電郵地址').required('電郵地址為必填'),
        password: Yup.string()
          .required('密碼為必填')
          .min(6, '密碼需要至少6位字元'),
        passwordConfirm: Yup.string()
          .required('確認密碼為必填')
          .oneOf([Yup.ref('password'), null], '確認密碼與密碼不符'),
      })
    : Yup.object({
        email: Yup.string().email('無效的電郵地址').required('電郵地址為必填'),
        password: Yup.string().required('密碼為必填'),
      });

  const submitHandler = async (values) => {
    if (!signup) {
      try {
        const res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          {},
          'POST',
          values
        );
        if (res.status === 'success') login(res.token);
      } catch (err) {}
    } else {
      try {
        const res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          {},
          'POST',
          values
        );
        if (res.status === 'success') login(res.token);
      } catch (err) {}
    }
  };

  return (
    <>
      <Modal
        onCancel={clearError}
        errorMsg={error?.message}
        show={!!error}
        content={signup ? '註冊失敗' : '登入失敗'}
      />
      <section className="grid justify-center gap-3">
        <div className="w-80 sm:w-96 -translate-x-2 mb-4">
          <img src={logo} alt="Logo" />
        </div>
        <h2>{signup ? '註冊' : '登入'}</h2>
        {isLoading && !error && <LoadingSpinner />}
        {!error && !isLoading && (
          <Formik
            initialValues={{
              email: '',
              password: '',
              name: '',
              passwordConfirm: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ isValid, values }) => (
              <Form className="grid gap-6 w-full max-w-lg">
                {signup && (
                  <Input
                    icon={<i className="fa-solid fa-signature"></i>}
                    label="用戶名"
                    name="name"
                    value={values.name}
                    type="text"
                    placeholder="用戶名"
                    autoComplete="new-password"
                  />
                )}
                <Input
                  icon={<i className="fa-solid fa-at"></i>}
                  label="電郵地址"
                  name="email"
                  value={values.email}
                  type="text"
                  placeholder="電郵地址"
                />
                <Input
                  icon={<i className="fa-solid fa-lock"></i>}
                  label="密碼"
                  name="password"
                  value={values.password}
                  type="password"
                  placeholder="密碼"
                />
                {signup && (
                  <Input
                    icon={<i className="fa-solid fa-lock"></i>}
                    label="確認密碼"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    type="password"
                    placeholder="密碼"
                  />
                )}
                <Button
                  className="w-4/6 mx-auto"
                  btnType={!isValid ? 'disabled' : ''}
                  type="submit"
                  disabled={!isValid}
                >
                  {signup ? '註冊' : '登入'}
                </Button>
                <Button
                  btnType="grey"
                  type="button"
                  className="w-4/6 mx-auto"
                  onClick={() => setSignup(!signup)}
                >
                  <i className="fa-regular fa-circle-question"></i>
                  {signup ? '已有帳戶？請接此登入' : '沒有帳戶？請接此註冊'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </section>
    </>
  );
};

export default Auth;
