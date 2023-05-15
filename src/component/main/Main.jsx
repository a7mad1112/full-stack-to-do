import Task from "../Task/Task";
import RelaxImg from "../relax-img/RelaxImg";
import './main.css'
const Main = ({ currPage }) => {
  const { title, tasks } = currPage;
  const completeTasks = tasks.filter((t) => !t.isComplete);
  const unCompleteTasks = tasks.filter((t) => t.isComplete);
  return (
    <section id="main-content" className="p-5 w-100">
      <header className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-3">{title}</h2>
        <label htmlFor="search">
          <span>Search: </span>
          <input type="search" id="search" />
        </label>
      </header>
      <div className="tasks-container w-100">
        {/* Add tasks Button */}
        {title === "Home" && (
          <div className="add-task w-100 rounded">
            <button className="w-100 rounded">
              <i className="fa-solid fa-plus add-project"></i>
              <span>Add new task</span>
            </button>
          </div>
        )}
        {/* Accordion */}
        <div className="my-accordion">
          {unCompleteTasks.length === 0 ? (
            <RelaxImg />
          ) : (
            unCompleteTasks
              .map((t) => <Task key={t.id} task={t} />)
          )}
        </div>
      </div>
      <h2 className="fs-6 mt-4">Complete Tasks</h2>
      <div className="my-accordion complete-tasks">
        {completeTasks
          .map((t) => (
            <Task key={t.id} task={t} />
          ))}
      </div>
    </section>
  );
};

export default Main;
