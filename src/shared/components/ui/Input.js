import { useField } from 'formik';

const Input = ({ icon, label, ...props }) => {
  const [field, meta] = useField(props);

  let inputElement;
  inputElement =
    props.type === 'textarea' ? (
      <textarea
        className={`border py-2 px-4 rounded-lg${
          meta.error && meta.touched ? ' border-red-600' : ''
        }`}
        rows={3}
        {...field}
        {...props}
      />
    ) : (
      <input
        className={`border py-2 px-4 rounded-lg${
          meta.error && meta.touched ? ' border-red-600' : ''
        }`}
        autoComplete="off"
        {...field}
        {...props}
      />
    );

  return (
    <div className="grid gap-1.5">
      <label className="text-sky-900" htmlFor={field.name}>
        {icon}
        {label}
      </label>
      {inputElement}
      {meta.touched && meta.error && (
        <p className="text-red-600">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
