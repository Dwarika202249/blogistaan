import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../style/login.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postLogin } from "../../store/asyncMethods/AuthMethods";

const Login = () => {
  const dispatch = useDispatch();
  const { loginErrors, loading } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
  };

  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors]);
  return (
    <>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="User Login Page" />
      </Helmet>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={userLogin}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="loginInput"
            placeholder="Enter your username"
            value={state.name}
            onChange={handleInputs}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="loginInput"
            placeholder="Enter your password"
            value={state.password}
            onChange={handleInputs}
          />
          <input
            className="loginButton"
            type="submit"
            value={loading ? "..." : "Login"}
          />
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "14px",
            },
          }}
        />
      </div>
    </>
  );
};

export default Login;
