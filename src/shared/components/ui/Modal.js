import ReactDOM from 'react-dom';
import { useState } from 'react';

const Modal = (props) => {
  // const [modalOpened, setModalOpened] = useState(true);

  const content = (
    <div className={`animate-fadeIn ${!props.show ? 'hidden' : ''}`}>
      {/* Overlay */}
      <div
        className={`z-30 fixed top-0 left-0 w-screen h-screen bg-slate-700 opacity-90`}
        onClick={props.onCancel}
      ></div>
      {/* Actual Content */}
      <div
        className={`z-40 fixed w-10/12 bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg p-8 
        ${props.className ?? ''}`}
      >
        {props.children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default Modal;
