import { Field } from 'formik';

const CheckboxGroup = (props) => {
  return (
    <div className="grid gap-2">
      <div className="flex gap-2 items-center">
        <label>{props.label}</label>
        <button
          type="button"
          className="py-1 px-2 border rounded-lg border-green-600 text-green-600 hover:bg-green-50"
          onClick={props.onSelectAll}
        >
          全選
        </button>
        <button
          type="button"
          className="py-1 px-2 border rounded-lg border-red-600 text-red-600 hover:bg-red-50"
          onClick={props.onClear}
        >
          清除
        </button>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {props.options.map((option) => (
          <label key={option}>
            <Field type="checkbox" name={props.name} value={option} />
            <span className="ml-1.5">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
