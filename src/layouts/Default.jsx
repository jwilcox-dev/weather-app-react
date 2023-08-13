import MainNav from "../components/Common/MainNav";
import MainFooter from "../components/Common/MainFooter";
import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <>
      <MainNav />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default Default;
