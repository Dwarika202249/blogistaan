import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postDetails, postComment } from "../store/asyncMethods/PostMethods";
import { htmlToText } from "html-to-text";
import Loader from "./Loader";
import Comments from "./Comments";
import moment from "moment";
import { Helmet } from "react-helmet";
import "./style/details.css";

const Details = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.AuthReducer);
  const { loading, details, comments } = useSelector(
    (state) => state.PostReducer
  );
  const dispatch = useDispatch();
  const addComment = (e) => {
    e.preventDefault();
    dispatch(postComment({ id: details._id, comment, userName: user.name })); //name => from User Schema model
    setComment("");
    dispatch(postDetails(id));
  };
  useEffect(() => {
    dispatch(postDetails(id));
  }, [id]);
  return (
    <div className="details_container">
      <div className="row">
        <div className="col-9">
          {!loading ? (
            <div className="post_details">
              <Helmet>
                <title>{details.title}</title>
              </Helmet>
              <div className="post_header">
                <div className="post_header_avatar">
                  {details.userName ? details.userName[0] : ""}
                </div>
                <div className="post_header_user">
                  <span>{details.userName}</span>
                  <span className="updatedTime">
                    {moment(details.updatedAt).format("MMM Do YYYY")}
                  </span>
                </div>
              </div>
              <div className="post_body">
                <h1 className="post_body_title">{details.title}</h1>
                <div className="post_body_details">
                  {htmlToText(details.body)}
                </div>
                <div className="post_body_image">
                  <img
                    className="imagePreview details_img"
                    src={`/images/${details.image}`}
                    alt={details.image}
                  />
                </div>
                {user ? (
                  <>
                    <div className="post_comment">
                      <form onSubmit={addComment}>
                        <input
                          type="text"
                          className="commentInput"
                          placeholder="Comment here..."
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                        />
                        <div>
                          <input
                            className="loginButton"
                            type="submit"
                            value="Comment"
                          />
                        </div>
                      </form>
                    </div>
                    <Comments comments={comments} />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
