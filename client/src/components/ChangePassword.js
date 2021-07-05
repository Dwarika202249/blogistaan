import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePasswordAction } from "../store/asyncMethods/ProfileMethods";
import Sidebar from "./Sidebar";
import { RESET_PROFILE_ERRORS } from "../store/types/ProfileTypes";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import "./style/changepassword.css";

const ChangePassword = () => {
  const { push } = useHistory();
  const [state, setState] = useState({
    current: "",
    newPassword: "",
    userId: null,
  });
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { updateErrors } = useSelector((state) => state.updateName);
  const {
    user: { _id },
  } = useSelector((user) => user.AuthReducer);
  const updatePassword = (e) => {
    e.preventDefault();
    dispatch(
      updatePasswordAction({
        current: state.current,
        newPassword: state.newPassword,
        userId: _id,
      })
    );
  };
  useEffect(() => {
    if (updateErrors.length !== 0) {
      updateErrors.map((error) => toast.error(error.msg));
      dispatch({ type: RESET_PROFILE_ERRORS });
    }
  }, [updateErrors]);
  useEffect(() => {
    if (redirect) {
      push("/dashboard");
    }
  }, [redirect]);
  return !loading ? (
    <div className="changePass">
      <Helmet>
        <title>Update Password</title>
        <meta name="description" content="Update user password" />
      </Helmet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <div className="card">
            <h3 className="card__h3">Update Password</h3>
            <form onSubmit={updatePassword}>
              <div className="group divCenter">
                <input
                  type="password"
                  name=""
                  className="postInput"
                  placeholder="Current Password"
                  onChange={(e) =>
                    setState({ ...state, current: e.target.value })
                  }
                  value={state.current}
                />
              </div>
              <div className="group divCenter">
                <input
                  type="password"
                  name=""
                  className="postInput"
                  placeholder="New Password"
                  onChange={(e) =>
                    setState({ ...state, newPassword: e.target.value })
                  }
                  value={state.newPassword}
                />
              </div>
              <div className="group divCenter">
                <input
                  type="submit"
                  value="Update Password"
                  className="postButton"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ChangePassword;
