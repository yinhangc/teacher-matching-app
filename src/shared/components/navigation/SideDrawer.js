import ReactDOM from 'react-dom';

const SideDrawer = (props) => {
  const { setDrawerOpened, drawerOpened } = props;
  const content = (
    <>
      <div
        className={`duration-300 ease-in-out z-40 sm:hidden fixed top-0 left-0 h-screen bg-slate-700 ${
          drawerOpened ? 'opacity-90 w-screen' : 'w-0 opacity-0'
        }`}
        onClick={() => setDrawerOpened(false)}
      ></div>
      <aside
        className={`duration-200 ease-in-out sm:-translate-x-[150rem] fixed left-0 top-0  h-screen p-6 bg-sky-800 text-white text-xl z-50 w-[70%] overflow-auto  ${
          drawerOpened ? 'translate-x-0' : '-translate-x-[150rem]'
        }`}
      >
        {props.children}
      </aside>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer'));
};

export default SideDrawer;
