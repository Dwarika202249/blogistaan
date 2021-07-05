import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateNameAction } from "../store/asyncMethods/ProfileMethods";
import Sidebar from "./Sidebar";
import { RESET_PROFILE_ERRORS } from "../store/types/ProfileTypes";
import toast, { Toaster } from "react-hot-toast";
import "./style/updatename.css";

const UpdateName = () => {
  const { push } = useHistory();
  const [userName, setUserName] = useState("");
  const {
    user: { name, _id },
  } = useSelector((user) => user.AuthReducer);
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { updateErrors } = useSelector((state) => state.updateName);
  const dispatch = useDispatch();
  const updateNameMethod = (e) => {
    e.preventDefault();
    dispatch(updateNameAction({ name: userName, id: _id }));
  };
  useEffect(() => {
    setUserName(name);
  }, []);
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
  return (
    <div className="UpdateName">
      <Helmet>
        <title>Update Name</title>
        <meta name="description" content="Update username" />
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
            <h3 className="card__h3">Update Name</h3>
            <form onSubmit={updateNameMethod}>
              <div className="group divCenter">
                <input
                  type="text"
                  name=""
                  className="postInput"
                  placeholder="Name..."
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>
              <div className="group divCenter">
                <input
                  type="submit"
                  value="Update Name"
                  className="postButton"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateName;
