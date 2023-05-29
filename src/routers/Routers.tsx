
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home/Home.tsx';
import Today from '../pages/Today/Today.tsx';
import Week from '../pages/Week/Week.tsx';
const Routers: React.FC = () => {
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