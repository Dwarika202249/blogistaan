import moment from "moment";
import "./style/comments.css";

const Comments = ({ comments }) => {
  return comments.length > 0
    ? comments.map((comment) => (
        <div className="comment-section" key={comment._id}>
          <div className="post_header">
            <div className="post_header_avatar">
              {comment.userName ? comment.userName[0] : ""}
            </div>
            <div className="post_header_user">
              <span>{comment.userName}</span>
              <span className="updatedTime">
                {moment(comment.updatedAt).format("MMM Do YYYY")}
              </span>
            </div>
          </div>
          <div className="comment_body">{comment.comment}</div>
        </div>
      ))
    : "No comments";
};

export default Comments;
