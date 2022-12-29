import { Outlet, useNavigate, NavLink } from "react-router-dom";

const AuthWrapper = () => {
  const linkActive = (navStatus) => {
    return navStatus.isActive
      ? `nav_link_active btn bg-white px-5 fw-semibold shadow-0`
      : `btn btn-light px-5 fw-semibold shadow-0`;
  };

  const styles = {
    height: "100vh",
    overflowY: "auto",
  };
  return (
    <div
      className="container-fluid d-grid justify-content-center align-items-start mt-5 pt-5 hide_scroll"
      style={styles}
    >
      <div className="container-fluid mt-3">
        <div className="d-flex align-items-center justify-content-center">
          <NavLink className={linkActive} to="login">
            Sign In
          </NavLink>
          <NavLink className={linkActive} to="register">
            Sign Up
          </NavLink>
        </div>
        <div className="d-flex justify-content-center align-items-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
