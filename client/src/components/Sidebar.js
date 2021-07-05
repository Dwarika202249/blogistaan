import { Link } from "react-router-dom";
import "./style/sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__element">
          <h3>Settings</h3>
        </div>
        <div className="sidebar__element element_hover">
          <Link to="/updateName" className="link">
            Change Name
          </Link>
        </div>
        <div className="sidebar__element element_hover">
          <Link to="/updatePassword" className="link">
            Change Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
