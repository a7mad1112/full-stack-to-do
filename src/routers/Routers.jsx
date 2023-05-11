
import { Routes, Route } from "react-router-dom"
import Home from './../pages/Home/Home';
import Today from './../pages/Today/Today';
import Week from './../pages/Week/Week';
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/today" element={<Today/>}/>
        <Route path="/week" element={<Week/>}/>
      </Routes>
    </>
  )
}

export default Routers