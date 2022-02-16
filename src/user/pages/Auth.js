import Input from '../../shared/components/ui/Input';
import Button from '../../shared/components/ui/Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import logo from '../../assets/logo.png';
import AuthContext from '../../shared/context/auth-context';
import { useContext } from 'react';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const validate = Yup.object({
    email: Yup.string().email('無效的電郵地址').required('電郵地址為必填'),
    password: Yup.string().required('密碼為必填'),
  });

  const submitHandler = async (values) => {
    console.log(values);
    login();
  };

  return (
    <section>
      <div className="w-80 sm:w-96 -translate-x-2 mx-auto mb-4">
        <img src={logo} alt="Logo" />
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validate}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ values, isValid, handleChange }) => (
          <Form className="grid gap-6 w-full max-w-lg mx-auto">
            <Input
              label="電郵地址"
              name="email"
              type="text"
              placeholder="電郵地址"
            />
            <Input
              label="密碼"
              name="password"
              type="password"
              placeholder="密碼"
            />
            <Button
              className="w-full max-w-sm mx-auto"
              btnType={!isValid ? 'disabled' : ''}
              type="submit"
              disabled={!isValid}
            >
              登入
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Auth;
