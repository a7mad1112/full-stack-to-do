import React from "react";
import Routers from "../../routers/Routers.tsx";
import Header from "../Header/Header.tsx";
import SideBar from "../SideBar/SideBar.tsx";

const Layout : React.FC = () => {
  return (
    <>
      <Header />
      <main className="d-flex">
        <SideBar />
      <Routers />
      </main>
    </>
  );
};

export default Layout;
