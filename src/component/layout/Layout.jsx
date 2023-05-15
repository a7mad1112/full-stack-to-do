import Routers from "../../routers/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="d-flex">
        <SideBar />
      <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
