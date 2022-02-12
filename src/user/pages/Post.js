import Input from '../../shared/components/ui/Input';
import CheckboxGroup from '../../shared/components/ui/CheckboxGroup';
import Button from '../../shared/components/ui/Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// prettier-ignore
const timeOption = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日','公眾假期'];
// prettier-ignore
const regionOption = ['中西區','灣仔區','東區','南區','九龍城區','深水埗區','油尖旺區','黃大仙區','觀塘區','北區','西貢區','沙田區','大埔區','離島區','葵青區','荃灣區','屯門區','元朗區']

const Post = () => {
  const initialValue = {
    title: '',
    phone: '',
    regions: [],
    time: [],
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <section>
      <h2 className="mb-4">刊登你的資料</h2>
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid gap-6 w-full max-w-xl mx-auto">
            <Input label="標題" name="title" type="text" placeholder="標題" />
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
            <Button type="submit">確定</Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Post;
