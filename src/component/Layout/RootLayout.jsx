import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
