import { useField } from 'formik';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="grid gap-1.5">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`border py-2 px-4 rounded-lg ${
          meta.error && meta.touched && 'border-red-600'
        }`}
        autoComplete="off"
        {...field}
        {...props}
      ></input>
      {meta.touched && meta.error && (
        <p className="text-red-600">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
