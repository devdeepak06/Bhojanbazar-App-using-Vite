import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
