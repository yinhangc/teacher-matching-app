import ReactDOM from 'react-dom';
import Button from './Button';

const Modal = (props) => {
  let modalContent = props.children;
  if (props.errorMsg) {
    modalContent = (
      <div className="text-center grid place-items-center gap-1">
        <h3>{props.content}</h3>
        <p className="text-red-600">({props.errorMsg})</p>
        <Button onClick={props.onCancel} className="w-40 mt-3">
          OK
        </Button>
      </div>
    );
  }

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
        {modalContent}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default Modal;
