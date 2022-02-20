import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { useContext } from 'react';
import Button from '../ui/Button';

const NavLinks = ({ setDrawerOpened }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const _className =
    'mb-5 py-4 cursor-pointer block transition-all ease-in-out hover:bg-sky-700 hover:pl-6 sm:inline-block sm:py-1 sm:hover:bg-sky-800 sm:hover:px-0 sm:mb-0';

  return (
    <ul className="flex flex-col sm:flex-row gap-2 sm:gap-12 sm:items-center">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? _className +
                ' border-l-2 pl-4 sm:pl-0 sm:border-b-2 sm:border-l-0'
              : _className
          }
          onClick={setDrawerOpened ? () => setDrawerOpened(false) : null}
        >
          {isLoggedIn ? '查看老師' : '揾老師'}
        </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink
              to="/user/post"
              className={({ isActive }) =>
                isActive
                  ? _className +
                    ' border-l-2 pl-4 sm:pl-0 sm:border-b-2 sm:border-l-0'
                  : _className
              }
              onClick={setDrawerOpened ? () => setDrawerOpened(false) : null}
            >
              刊登
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                isActive
                  ? _className +
                    ' border-l-2 pl-4 sm:pl-0 sm:border-b-2 sm:border-l-0'
                  : _className
              }
              onClick={setDrawerOpened ? () => setDrawerOpened(false) : null}
            >
              個人資料
            </NavLink>
          </li>
          <li className="grid place-items-center mt-4 sm:mt-0 sm:block">
            <Button
              className="font-bold"
              onClick={() => {
                if (setDrawerOpened) setDrawerOpened(false);
                logout();
                navigate('/');
              }}
            >
              登出
            </Button>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive
                ? _className +
                  ' border-l-2 pl-4 sm:pl-0 sm:border-b-2 sm:border-l-0'
                : _className
            }
            onClick={setDrawerOpened ? () => setDrawerOpened(false) : null}
          >
            登入/註冊
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
