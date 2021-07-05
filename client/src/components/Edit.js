import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, updateAction } from "../store/asyncMethods/PostMethods";
import { POST_RESET, RESET_UPDATE_ERRORS } from "../store/types/PostTypes";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import "./style/edit.css";

const Edit = () => {
  const { push } = useHistory();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { post, postStatus } = useSelector((state) => state.FetchPost);
  const { editErrors } = useSelector((state) => state.UpdatePost);
  useEffect(() => {
    if (postStatus) {
      setState({
        title: post.title,
        description: post.description,
      });
      setValue(post.body);
      dispatch({ type: POST_RESET });
    } else {
      dispatch(fetchPost(id));
    }
  }, [post]);
  const updatePost = (e) => {
    e.preventDefault();
    // console.log(value);
    dispatch(
      updateAction({
        title: state.title,
        body: value,
        description: state.description,
        id: post._id,
      })
    );
  };
  //   console.log(post);
  useEffect(() => {
    if (editErrors.length !== 0) {
      editErrors.map((error) => toast.error(error.msg));
      dispatch({ type: RESET_UPDATE_ERRORS });
    }
  }, [editErrors]);
  useEffect(() => {
    if (redirect) {
      push("/dashboard");
    }
  }, [redirect]);
  return !loading ? (
    <div className="edit">
      <Helmet>
        <title>Edit Post</title>
        <meta name="description" content="update post" />
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
      <div className="container">
        <form className="postForm" onSubmit={updatePost}>
          <div className="row">
            <div className="col-6 pad-15">
              <div className="card">
                <h3 className="card__h3">Edit post</h3>

                <div className="group columnDiv">
                  <label htmlFor="title">Post Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={state.title}
                    onChange={(e) =>
                      setState({ ...state, title: e.target.value })
                    }
                    className="postInput postTitle"
                    placeholder="Post title..."
                    autoComplete="off"
                  />
                </div>
                <div className="group">
                  <label htmlFor="body">Post body</label>
                  <ReactQuill
                    theme="snow"
                    id="body"
                    placeholder="Post body..."
                    value={value}
                    onChange={setValue}
                    className=".mar-bot-15"
                  />
                </div>
                <div className="group divCenter">
                  <input
                    type="submit"
                    value="Edit Post"
                    className="postButton"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 pad-15">
              <div className="card">
                <div className="group columnDiv">
                  <label htmlFor="description">Meta Description</label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    defaultValue={state.description}
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    onKeyUp={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    className="postInput"
                    placeholder="Meta description..."
                    maxLength="200"
                  ></textarea>
                  <p className="length">
                    {state.description ? state.description.length : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Edit;
