import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { homePosts } from "../store/asyncMethods/PostMethods";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { htmlToText } from "html-to-text";
import Loader from "./Loader";
import Pagination from "./Pagination";
import "./style/home.css";

const Home = () => {
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }
  const { loading } = useSelector((state) => state.PostReducer);
  const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homePosts(page));
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Blogistaan || A new Journey</title>
        <meta
          name="description"
          content="A journey to explore something new. Learn, Blog, and Teach."
        />
      </Helmet>
      <div className="home_container">
        <div className="post_row" style={{ marginBottom: "30px" }}>
          <div className="col-9 home">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="post_row post-style" key={post._id}>
                    <div className="col-9">
                      <div className="post">
                        <div className="post_header">
                          <div className="post_header_avatar">
                            {post.userName[0]}
                          </div>
                          <div className="post_header_user">
                            <span>{post.userName}</span>
                            <span className="updatedTime">
                              {moment(post.updatedAt).format("MMM Do YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className="post_body">
                          <h1 className="post_body_title">
                            <Link to={`/details/${post.slug}`} className="link">
                              {post.title}
                            </Link>
                          </h1>
                          <div className="post_body_details">
                            {htmlToText(post.body.slice(0, 300))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <img
                        className="imagePreview post_image"
                        src={`/images/${post.image}`}
                        alt={post.image}
                      />
                    </div>
                  </div>
                ))
              ) : (
                "No posts"
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="post_row">
          <div className="col-9">
            <Pagination
              path="home"
              page={page}
              perPage={perPage}
              count={count}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
