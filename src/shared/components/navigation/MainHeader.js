import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const MainHeader = () => {
  return (
    <header className="px-[5%] h-20 flex items-center justify-between bg-sky-800 text-white">
      <h1>
        <Link to="/">PianoTeachers</Link>
      </h1>
      <ul className="flex gap-10">
        <li>
          <NavLink to="/">揾老師</NavLink>
        </li>
        <li>
          <NavLink to="/post">刊登</NavLink>
        </li>
        <li>
          <NavLink to="/auth">登入/註冊</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default MainHeader;
