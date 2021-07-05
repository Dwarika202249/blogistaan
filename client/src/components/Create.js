import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../store/asyncMethods/PostMethods";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import "./style/create.css";

const Create = (props) => {
  const { createErrors, redirect, loading } = useSelector(
    (state) => state.PostReducer
  );
  const [currentImage, setCurrentImage] = useState("Choose image");
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const {
    user: { _id, name },
  } = useSelector((state) => state.AuthReducer);
  // console.log(_id, name);
  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setCurrentImage(e.target.files[0].name);
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleDescription = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [slug, setSlug] = useState("");
  const [slugButton, setSlugButton] = useState(false);
  const slugHandle = (e) => {
    setSlugButton(true);
    setSlug(e.target.value);
  };
  const handleURL = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };
  const [value, setValue] = useState("");
  const createPost = (e) => {
    e.preventDefault();
    const { title, description, image } = state;
    const formData = new FormData(); //built in javascript
    formData.append("title", title);
    formData.append("body", value);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("name", name);
    formData.append("id", _id);
    dispatch(createAction(formData));
  };
  useEffect(() => {
    if (redirect) {
      props.history.push("/dashboard");
    }
    if (createErrors.length !== 0) {
      createErrors.map((err) => toast.error(err.msg));
    }
  }, [createErrors, redirect]);
  return (
    <>
      <div className="create">
        <Helmet>
          <title>Create Post</title>
          <meta name="description" content="Create Post Page" />
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
        {!loading ? (
          <div className="container">
            <form className="postForm" onSubmit={createPost}>
              <div className="row">
                <div className="col-6 pad-15">
                  <div className="card">
                    <h3 className="card__h3">Create a new post</h3>

                    <div className="group columnDiv">
                      <label htmlFor="title">Post Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={state.title}
                        onChange={handleInput}
                        className="postInput postTitle"
                        placeholder="Post title..."
                        autoComplete="off"
                      />
                    </div>
                    <div className="group">
                      <label className="image_label" htmlFor="image">
                        {currentImage}
                      </label>
                      <input
                        type="file"
                        name="image" //error 2  replacing picture to image
                        id="image"
                        className="postInput postImage"
                        placeholder="Choose image..."
                        onChange={fileHandle}
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
                        value="Create Post"
                        className="postButton"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6 pad-15">
                  <div className="card">
                    <div className="group columnDiv">
                      <label htmlFor="slug">Post URL</label>
                      <input
                        type="text"
                        name="slug"
                        id="slug"
                        value={slug}
                        onChange={slugHandle}
                        className="postInput"
                        placeholder="Post URL..."
                        autoComplete="off"
                      />
                    </div>
                    <div className="group divCenter">
                      {slugButton ? (
                        <button className="slugButton" onClick={handleURL}>
                          Update Slug
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="group">
                      <div>
                        {imagePreview ? (
                          <img className="imagePreview" src={imagePreview} />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="group columnDiv">
                      <label htmlFor="description">Meta Description</label>
                      <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        defaultValue={state.description}
                        onChange={handleDescription}
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
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Create;
