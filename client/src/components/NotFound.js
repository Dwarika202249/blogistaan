import { Helmet } from "react-helmet";
import "./style/notfound.css";

const NotFound = () => {
  return (
    <>
      <div className="notFound">
        <Helmet>
          <title>404 - Not Found</title>
          <meta name="description" content="Oops!! That page could not found" />
        </Helmet>
        <h1 className="notFound__container__h1">404</h1>
        <p className="notFound__container__p">
          Oops!! That page could not found
        </p>
      </div>
    </>
  );
};

export default NotFound;
