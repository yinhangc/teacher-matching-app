import React from 'react';

const Button = (props) => {
  let _className;
  switch (props.btnType) {
    case 'back':
      _className =
        'py-2 px-6 border hover:bg-slate-600 hover:text-white rounded-lg';
      break;
    case 'grey':
      _className = 'py-2 px-6 border bg-slate-600 text-white rounded-lg';
      break;
    case 'disabled':
      _className =
        'py-2 px-6 border bg-slate-600 text-white cursor-default rounded-lg';
      break;
    case 'small':
      _className = 'py-1 px-2 border rounded-lg text-sm';
      break;
    default:
      _className =
        'py-2 px-6 border bg-sky-800 text-white hover:bg-sky-700 rounded-lg';
  }

  return (
    <button
      className={`${_className} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
