import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "./MainNav.css";

const MainNav = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="p-7 bg-gray-200 relative shadow-md mb-11">
      <div className="flex absolute top-4 right-4 gap-4">
        {!isLoggedIn && (
          <NavLink
            to="/register"
            className="nav__button login__button font-bold"
          >
            Register
          </NavLink>
        )}
        {isLoggedIn ? (
          <button
            className="nav__button login__button font-bold"
            onClick={logout}
          >
            Log Out
          </button>
        ) : (
          <NavLink to="/login" className="nav__button login__button font-bold">
            Log In
          </NavLink>
        )}
      </div>
      <NavLink
        to="/"
        className="nav__button home__button absolute top-4 left-4 font-bold"
      >
        🏠
      </NavLink>
    </nav>
  );
};

export default MainNav;
