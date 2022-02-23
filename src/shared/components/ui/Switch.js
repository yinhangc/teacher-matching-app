const Switch = ({ onChange, toggle, label, icon }) => {
  return (
    <div className="flex items-center gap-1.5">
      <label className="text-sky-900">
        {icon}
        {label}
      </label>
      <div
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
          toggle ? 'bg-green-500' : 'bg-gray-400'
        }`}
        onClick={onChange}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
            toggle && 'transform translate-x-[1.61rem]'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
