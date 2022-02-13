import { NavLink } from 'react-router-dom';

const NavLinks = ({ setDrawerOpened }) => {
  return (
    <ul className="flex flex-col sm:flex-row gap-2 sm:gap-12">
      <li>
        <NavLink
          to="/"
          className="hover:bg-sky-700 hover:px-2 sm:hover:bg-sky-800 sm:hover:px-0 py-5 cursor-pointer block transition-all"
          onClick={() => setDrawerOpened(false)}
        >
          揾老師
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/post"
          className="hover:bg-sky-700 hover:px-2 sm:hover:bg-sky-800 sm:hover:px-0 py-5 cursor-pointer block transition-all"
          onClick={() => setDrawerOpened(false)}
        >
          刊登
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/auth"
          className="hover:bg-sky-700 hover:px-2 sm:hover:bg-sky-800 sm:hover:px-0 py-5 cursor-pointer block transition-all"
          onClick={() => setDrawerOpened(false)}
        >
          登入/註冊
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
