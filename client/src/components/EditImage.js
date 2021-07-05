import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateImageAction } from "../store/asyncMethods/PostMethods";
import toast, { Toaster } from "react-hot-toast";
import { RESET_UPDATE_IMAGE_ERRORS } from "../store/types/PostTypes";
import "./style/editimage.css";

const EditImage = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { updateImageErrors } = useSelector((state) => state.UpdateImage);
  const { redirect } = useSelector((state) => state.PostReducer);
  const [state, setState] = useState({
    image: "",
    imagePreview: "",
    imageName: "Choose image",
  });
  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({
          ...state,
          imagePreview: reader.result,
          image: e.target.files[0],
          imageName: e.target.files[0].name,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const updateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", state.image);
    dispatch(updateImageAction(formData));
  };
  useEffect(() => {
    if (updateImageErrors.length !== 0) {
      updateImageErrors.map((error) => toast.error(error.msg));
      dispatch({ type: RESET_UPDATE_IMAGE_ERRORS });
    }
  }, [updateImageErrors]);
  useEffect(() => {
    if (redirect) {
      push("/dashboard");
    }
  }, [redirect]);
  return (
    <>
      <div className="editImage">
        <Helmet>
          <title>Update image</title>
          <meta name="description" content="Update image" />
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
          <div className="col-6 pad-15">
            <div className="card">
              <h3 className="card__h3">Update Post Image</h3>
              <form onSubmit={updateImage}>
                <div className="group columnDiv">
                  <label className="image_label" htmlFor="image">
                    {state.imageName}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="postInput postImage"
                    placeholder="Choose image..."
                    onChange={fileHandle}
                  />
                </div>
                <div className="group">
                  <div>
                    {state.imagePreview ? (
                      <img
                        src={state.imagePreview}
                        className="editImagePreview"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="group divCenter">
                  <input
                    type="submit"
                    value="Update Image"
                    className="postButton"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditImage;
