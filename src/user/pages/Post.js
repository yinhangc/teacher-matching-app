import Input from '../../shared/components/ui/Input';
import CheckboxGroup from '../../shared/components/ui/CheckboxGroup';
import Button from '../../shared/components/ui/Button';
import Editor from '../../shared/components/ui/Editor';
import Switch from '../../shared/components/ui/Switch';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHttp } from '../../shared/hooks/use-http';
import AuthContext from '../../shared/context/auth-context';
import { useContext, useEffect, useState, useCallback } from 'react';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import Modal from '../../shared/components/ui/Modal';
import { escape, unescape } from 'lodash';

// prettier-ignore
const timeOption = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日','公眾假期'];
// prettier-ignore
const regionOption = ['中西區','灣仔區','東區','南區','九龍城區','深水埗區','油尖旺區','黃大仙區','觀塘區','北區','西貢區','沙田區','大埔區','離島區','葵青區','荃灣區','屯門區','元朗區']

const Post = () => {
  const { token, userId } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [success, setSuccess] = useState(false);
  const [initialValue, setInitialValue] = useState({
    title: '',
    phone: '',
    region: [],
    time: [],
    description: '',
    showInfo: true,
  });
  const { isLoading, error, clearError, sendRequest } = useHttp();

  useEffect(() => {
    const getUserPost = async () => {
      const {
        data: { user },
      } = await sendRequest(`http://localhost:8000/api/users/getMe`, {
        Authorization: 'Bearer ' + token,
      });
      if (user.post.length > 0) {
        setPost(user.post[0]);
        console.log(user.post[0]);
        setInitialValue({
          title: user.post[0].title,
          phone: user.post[0].phone,
          region: user.post[0].region,
          time: user.post[0].time,
          showInfo: user.post[0].showPost,
          description: unescape(user.post[0].description),
        });
      }
    };
    getUserPost();
  }, [sendRequest, userId, token]);

  const validate = Yup.object({
    title: Yup.string().required('標題為必填'),
    phone: Yup.string().required('聯絡電話為必填'),
    time: Yup.array().min(1, '時間為必填'),
    region: Yup.array().min(1, '地區為必填'),
    description: Yup.string()
      .matches(/^(?![<p><br></p>]+$).*/, { excludeEmptyString: true })
      .required(),
  });

  const submitHandler = async (values) => {
    if (!post) {
      values.description = escape(values.description);
      try {
        const res = await sendRequest(
          'http://localhost:8000/api/posts',
          {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          'POST',
          values
        );
        console.log(res);
        setSuccess(true);
      } catch (err) {}
    }
    console.log(values);
  };

  const descriptionChangeHandler = useCallback((content, setFieldValue) => {
    setFieldValue('description', content);
  }, []);

  return (
    <>
      <Modal
        onCancel={clearError}
        errorMsg={error?.message}
        show={!!error}
        content="刊登失敗"
      />
      <Modal
        onCancel={() => setSuccess(false)}
        successMsg={post ? '(歡迎上載圖片到刊登資料😄)' : '(資料已成功更改！)'}
        show={success}
        content="刊登成功！"
      />
      <section>
        <h2 className="mb-4">{post ? '更新你的刊登資料' : '刊登你的資料'}</h2>
        {isLoading && !error && <LoadingSpinner />}
        {!isLoading && !error && (
          <Formik
            initialValues={initialValue}
            validationSchema={validate}
            onSubmit={(values) => submitHandler(values)}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, isValid }) => (
              <Form className="grid gap-8 w-full max-w-2xl mx-auto">
                <Input
                  label="標題"
                  name="title"
                  type="textarea"
                  placeholder="標題"
                  value={values.title}
                />
                <Input
                  label="聯絡電話"
                  name="phone"
                  type="text"
                  placeholder="聯絡電話"
                />
                <CheckboxGroup
                  onSelectAll={() => setFieldValue('time', timeOption)}
                  onClear={() => setFieldValue('time', [])}
                  name="time"
                  label="時間"
                  options={timeOption}
                />
                <CheckboxGroup
                  onSelectAll={() => setFieldValue('region', regionOption)}
                  onClear={() => setFieldValue('region', [])}
                  name="region"
                  label="地區"
                  options={regionOption}
                />
                <Editor
                  value={values.description}
                  name="description"
                  defaultValue={unescape(post?.description) ?? ''}
                  onChange={descriptionChangeHandler}
                  setFieldValue={setFieldValue}
                  viewText={false}
                />
                <Switch
                  name="showInfo"
                  label="顯示你的檔案？"
                  toggle={values.showInfo}
                  onChange={() => setFieldValue('showInfo', !values.showInfo)}
                />
                <Button className="w-full max-w-sm mx-auto" type="submit">
                  {post ? '確定更改' : '確定刊登'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </section>
    </>
  );
};

export default Post;
