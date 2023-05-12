import { useRef, useState } from "react";
import './toggle-sidebar.css';
const ToggleSideBar = () => {
  const togglerRef = useRef(null);
  const [isXNav, setIsXNav] = useState(false);
  const handleClick = () => {
    togglerRef.current.classList.toggle('menu-clicked');
    setIsXNav(!isXNav);
    document.getElementById('side').classList.toggle('show-side');
  }
  return (
    <div className="menu-icon-container">
      <div ref={togglerRef} className="menu-icon" onClick={handleClick}>
        <span className="fade-left first-part w-50"></span>
        <span className="fade-right first-part w-50"></span>
        <span className={`toggler-1 sec-part ${isXNav ? 'x-nav' : null}`}></span>
        <span className={`toggler-2 sec-part ${isXNav ? 'x-nav' : null}`}></span>
        <span className="fade-left w-50 third-part"></span>
        <span className="fade-right w-50 third-part"></span>
      </div>
    </div>
  )
}

export default ToggleSideBar