import { Outlet } from "react-router-dom";
import Header from "../Components/common/Header";

const StaticWrapper = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default StaticWrapper;
