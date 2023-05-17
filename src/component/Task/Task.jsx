import { useContext, useRef, useState } from "react";
import "./task.css";
import { tasksContext } from "../../context/tasksContext";
const Task = ({ task, setShowDeleteTaskModal, setShowEditTaskModal }) => {
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

  const { setCurrTask, setTasks } = useContext(tasksContext);
  const UPDATE_COMPLETION_URL =
    "http://127.0.0.1:3000/api/v1/tasks/update/completion?id=";
  const UPDATE_TITLE = "http://127.0.0.1:3000/api/v1/tasks/update/title?id=";

  const [checkboxValue, setCheckboxValue] = useState(task.isCompleted);
  const [inlineInput, setInlineInput] = useState(task.title);

  const updateCompletion = ({ target }) => {
    // console.log(!checkboxValue);
    fetch(UPDATE_COMPLETION_URL + task.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !checkboxValue }),
    })
      .then((res) => {
        if (res.ok) return fetch("http://127.0.0.1:3000/api/v1/tasks");
      })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => {
        console.error(err);
      });
    setCheckboxValue(!checkboxValue);
  };

  const handleInlineEdit = () => {
    fetch(UPDATE_TITLE + task.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: inlineInput }),
    })
      .then((res) => {
        if (res.ok) return fetch("http://127.0.0.1:3000/api/v1/tasks");
      })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
              handleInlineEdit();
            }}
            onFocus={(ev) => {
              ev.target.value = inlineInput;
              ev.target.select();
            }}
            onChange={(e) => setInlineInput(e.target.value)}
            aria-label="text"
            data-task-id={task.id}
          />
        </div>
        <div className="task-actions">
          <span
            id="edit-task-btn"
            role="button"
            onClick={() => {
              setShowEditTaskModal(true);
              setCurrTask(task);
            }}
          >
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
            checked={checkboxValue}
            onChange={updateCompletion}
          />
        </p>
      </div>
    </div>
  );
};

export default Task;
