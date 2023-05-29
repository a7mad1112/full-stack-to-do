import ToggleSideBar from "../ToggleSideBar/ToggleSideBar.tsx"
import './header.css';
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="d-flex justify-content-end align-items-center">
        <ToggleSideBar/>
      </div>
    </header>
  )
}

export default Header