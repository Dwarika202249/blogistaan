import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postRegister } from "../../store/asyncMethods/AuthMethods";
import "../style/register.css";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, registerErrors, user } = useSelector(
    (state) => state.AuthReducer
  ); // select from redux
  const dispatch = useDispatch();
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userRegister = async (e) => {
    e.preventDefault(); // to prevent reloading
    dispatch(postRegister(state));
    state.name = "";
    state.email = "";
    state.password = "";
  };
  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error.msg));
    }
  }, [registerErrors, user]); // [] -> add as dependencies
  return (
    <>
      <Helmet>
        <title>User Register</title>
        <meta name="description" content="User Register Page" />
      </Helmet>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={userRegister}>
          <label>Username</label>
          <input
            type="text"
            name="name"
            className="registerInput"
            placeholder="Enter your username"
            value={state.name}
            onChange={handleInputs}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="registerInput"
            placeholder="Enter your email"
            value={state.email}
            onChange={handleInputs}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="registerInput"
            placeholder="Enter your password"
            value={state.password}
            onChange={handleInputs}
          />
          <input
            type="submit"
            className="registerButton"
            value={loading ? "..." : "Register"}
          />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: "14px",
              },
            }}
          />
        </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
      </div>
    </>
  );
};

export default Register;
