import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainHeader = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <>
      <SideDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened}>
        <nav>
          <h1 className="mb-10" style={{ fontFamily: 'cursive' }}>
            <Link to="/">PianoTeachers</Link>
          </h1>
          <NavLinks setDrawerOpened={setDrawerOpened} />
        </nav>
      </SideDrawer>
      <header className="px-[5%] h-20 flex items-center justify-between bg-sky-800 text-white">
        <h1 style={{ fontFamily: 'cursive' }}>
          <Link to="/">PianoTeachers</Link>
        </h1>
        <button
          className="flex flex-col gap-1.5 sm:hidden transition-all duration-100 hover:scale-y-125"
          onClick={() => setDrawerOpened(true)}
        >
          <span className="bg-white w-6 h-0.5 block" />
          <span className="bg-white w-6 h-0.5 block" />
          <span className="bg-white w-6 h-0.5 block" />
        </button>
        <nav className="hidden sm:block">
          <NavLinks />
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
