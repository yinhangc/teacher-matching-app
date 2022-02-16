import Input from '../../shared/components/ui/Input';
import CheckboxGroup from '../../shared/components/ui/CheckboxGroup';
import Button from '../../shared/components/ui/Button';
import Editor from '../../shared/components/ui/Editor';
import Switch from '../../shared/components/ui/Switch';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHttp } from '../../shared/hooks/use-http';
import AuthContext from '../../shared/context/auth-context';
import { useContext } from 'react';

// prettier-ignore
const timeOption = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日','公眾假期'];
// prettier-ignore
const regionOption = ['中西區','灣仔區','東區','南區','九龍城區','深水埗區','油尖旺區','黃大仙區','觀塘區','北區','西貢區','沙田區','大埔區','離島區','葵青區','荃灣區','屯門區','元朗區']

const Post = () => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const initialValue = {
    title: '',
    phone: '',
    regions: [],
    time: [],
    description: '',
    showInfo: true,
  };

  const validate = Yup.object({
    title: Yup.string().required('標題為必填'),
    phone: Yup.string().required('聯絡電話為必填'),
    time: Yup.array().min(1, '時間為必填'),
    regions: Yup.array().min(1, '地區為必填'),
  });

  const submitHandler = async (values) => {
    console.log(values);
  };

  return (
    <section>
      <h2 className="mb-4">刊登你的資料</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={validate}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid gap-8 w-full max-w-2xl mx-auto">
            <Input
              label="標題"
              name="title"
              type="textarea"
              placeholder="標題"
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
              onSelectAll={() => setFieldValue('regions', regionOption)}
              onClear={() => setFieldValue('regions', [])}
              name="regions"
              label="地區"
              options={regionOption}
            />
            <Editor
              value={values.description}
              onChange={(content) => setFieldValue('description', content)}
            />
            <Switch
              name="showInfo"
              label="顯示你的檔案？"
              toggle={values.showInfo}
              onChange={() => setFieldValue('showInfo', !values.showInfo)}
            />
            <Button type="submit" className="w-full max-w-sm mx-auto">
              確定
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Post;
