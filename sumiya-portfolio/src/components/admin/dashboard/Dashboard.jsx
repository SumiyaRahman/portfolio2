import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-8">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Menu
        </label>
        <div className="bg-base-200 min-h-screen rounded-lg p-4">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className="text-xl font-bold mb-4">Admin Dashboard</li>
          <li>
            <Link to="/admin/dashboard/banner-intro">Update Banner Intro</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/social-links">Update Social Links</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/about-me">About Me</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/skills">Add Skills</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/educational-qualification">Add Educational Qualification</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/achievement">Add Achievement</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/project">Add Project</Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
