import Header from "./component/Header/Header"
import Routers from "./routers/Routers"
import Footer from './component/Footer/Footer';
import SideBar from "./component/SideBar/SideBar";

function App() {

  return (
    <>
      <Header/>
      <main className="d-flex">
        <SideBar/>
      </main>
      <Routers/>
      <Footer/>
    </>
  )
}

export default App
