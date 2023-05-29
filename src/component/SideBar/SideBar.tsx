import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./side-bar.css";
import { tasksContext } from "../../context/tasksContext.ts";
const SideBar: React.FC = () => {
  useEffect(() => {
    const value: string = localStorage.getItem("displayMode") || "";
    if (value === "dark") document.body.classList.add("display-dark");
  }, []);

  const { tasks } = useContext(tasksContext);

  const toggleDisplayMode = (): void => {
    let value: string = localStorage.getItem("displayMode") ?? 'light';
    value = value === "light" ? "dark" : "light";
    localStorage.setItem("displayMode", value);
    value === "dark"
      ? document.body.classList.add("display-dark")
      : document.body.classList.remove("display-dark");
  };
  return (
    <aside id="side">
      <header className="d-flex  justify-content-between align-items-center mb-4">
        <h1 className="text-uppercase">todo</h1>
        <span className="scale-action logo">
          <i className="ri-github-fill"></i>
        </span>
      </header>

      <div className="wrapper">
        <nav>
          <ul className="p-0">
            <li>
              <NavLink to={"/"} activeclassname="active" data-tasks-count={tasks?.length}>
                <i className="ri-home-office-fill"></i>
                <span>home</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/today"} activeclassname="active">
                <i className="ri-calendar-fill"></i>
                <span>today</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/week"} activeclassname="active">
                <i className="ri-calendar-fill"></i>
                <span>week</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <footer>
          <hr />
          <div id="display-mode" onClick={toggleDisplayMode}>
            <span className="light-mode">
              <i className="ri-sun-fill"></i>
            </span>
            <span className="dark-mode">
              <i className="ri-moon-clear-fill"></i>
            </span>
            <span className="ball"></span>
          </div>
        </footer>
      </div>
    </aside>
  );
};

export default SideBar;
