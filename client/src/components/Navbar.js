import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../store/types/UserTypes";
import logo from "../images/logo.png";
import "./style/navbar.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
  };
  const Links = user ? (
    <div className="navbar__right">
      <ul className="topList">
        <li className="topListItem">
          <Link to="/create" className="uppercase link">
            Create Post
          </Link>
        </li>
        <li className="topListItem">
          <Link to="/dashboard/1" className="uppercase link">
            {user.name}
          </Link>
        </li>
        <li className="topListItem">
          <span className="uppercase link cursor" onClick={logout}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  ) : (
    <div className="navbar__right">
      <ul className="topList">
        <li className="topListItem">
          <Link className="link" to="/login">
            LOGIN
          </Link>
        </li>
        <li className="topListItem">
          <Link className="link" to="/register">
            REGISTER
          </Link>
        </li>
      </ul>
    </div>
  );
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar__row">
            <div className="navbar__left">
              <Link to="/">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </div>
            {Links}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
