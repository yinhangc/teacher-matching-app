import { Field } from 'formik';
import Button from './Button';

const CheckboxGroup = (props) => {
  return (
    <div className="grid gap-2">
      <div className="flex gap-2 items-center">
        <label className="text-sky-900">{props.label}</label>
        <Button
          type="button"
          btnType="small"
          className=" border-green-600 text-green-600 hover:bg-green-50"
          onClick={props.onSelectAll}
        >
          全選
        </Button>
        <Button
          type="button"
          btnType="small"
          className="border-red-600 text-red-600 hover:bg-red-50"
          onClick={props.onClear}
        >
          清除
        </Button>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {props.options.map((option) => (
          <label key={option} className="text-base">
            <Field type="checkbox" name={props.name} value={option} />
            <span className="ml-1.5">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
