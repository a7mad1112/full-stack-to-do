import { useContext, useRef } from "react";
import "./task.css";
import { tasksContext } from "../../context/tasksContext";
const Task = ({ task, setShowDeleteTaskModal }) => {
  // function to check if the date is passed
  const hasDatePassed = (dateString) => {
    // create a Date object for the given date string
    const date = new Date(dateString);

    // create a Date object for the current date
    const today = new Date();

    // compare the two dates and return true if the given date has passed
    return date < today;
  };
  const taskRef = useRef(false);

  const { setCurrTask } = useContext(tasksContext);
  return (
    <div className="content-box" ref={taskRef}>
      <div
        className={`task rounded-3 ${task.priority}-priority`}
        aria-label="task"
      >
        <div className="label">
          <label
            htmlFor={`task-title-${task.id}`}
            onClick={() => {
              taskRef.current.classList.toggle("active");
            }}
          ></label>
          <input
            placeholder={task.title}
            onKeyDown={({ key, target }) => {
              // Trigger onBlur event
              if (key === "Enter" || key === "Escape") target.blur();
            }}
            onBlur={(ev) => {
              ev.target.value = "";
            }}
            onFocus={(ev) => {
              ev.target.value = task.title;
              ev.target.select();
            }}
            onChange={(ev) => {
              console.log("inline edit");
            }}
            aria-label="text"
            data-task-id={task.id}
          />
        </div>
        <div className="task-actions">
          <span id="edit-task-btn" role="button">
            <i className="ri-pencil-fill"></i>
          </span>
          <span
            id="delete-task-btn"
            role="button"
            aria-label="Delete task"
            onClick={() => {
              setShowDeleteTaskModal(true);
              setCurrTask(task);
            }}
          >
            <i className="ri-delete-bin-7-fill"></i>
          </span>
        </div>
      </div>
      <div className="content rounded-bottom">
        <p>Assignee: {task.assignee}</p>
        <p>Details: {task.details}</p>
        <p id="end-date" className="mt-1">
          <label htmlFor={`task-date${task.id}`}>Date: </label>
          <span className={`${hasDatePassed(task.date) && "time-limit"}`}>
            &nbsp;
            {task.date}
          </span>
        </p>
        <p className="is-done text-end">
          <label htmlFor={`task-isComplete-${task.id}`}>Complete: &nbsp;</label>
          <input
            type="checkbox"
            id={`task-isComplete-${task.id}`}
            name="isComplete"
            checked={task.isComplete}
          />
        </p>
      </div>
    </div>
  );
};

export default Task;
