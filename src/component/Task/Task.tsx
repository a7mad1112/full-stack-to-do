import { useContext, useRef, useState } from "react";
import "./task.css";
import { tasksContext } from "../../context/tasksContext.ts";
import { MyResponse, Task } from "../../types/types.ts";

type props = {
  task: Task;
  setShowDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Task: React.FC<props> = ({
  task,
  setShowDeleteTaskModal,
  setShowEditTaskModal,
}) => {
  // function to check if the date is passed
  const hasDatePassed = (dateString: string): boolean => {
    // create a Date object for the given date string
    const date: Date = new Date(dateString);

    // create a Date object for the current date
    const today: Date = new Date();

    // compare the two dates and return true if the given date has passed
    return date < today;
  };
  const taskRef = useRef<HTMLDivElement>(null);

  const { setCurrTask, setTasks } = useContext(tasksContext);
  const UPDATE_COMPLETION_URL: string =
    "http://127.0.0.1:3000/api/v1/tasks/update/completion?id=";
  const UPDATE_TITLE: string =
    "http://127.0.0.1:3000/api/v1/tasks/update/title?id=";

  const [checkboxValue, setCheckboxValue] = useState<boolean>(task.isCompleted);
  const [inlineInput, setInlineInput] = useState<string>(task.title);

  const updateCompletion = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log(!checkboxValue);
    fetch(UPDATE_COMPLETION_URL + task.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !checkboxValue }),
    })
      .then((res: Response) => {
        if (res.ok) return fetch("http://127.0.0.1:3000/api/v1/tasks");
        return Promise.reject("Cannot Update, something went wrong...");
      })
      .then((res: Response) => res.json())
      .then((data: MyResponse) => setTasks(data.tasks))
      .catch((err: Error) => {
        console.error(err);
      });
    setCheckboxValue(!checkboxValue);
  };

  const handleInlineEdit = (): void => {
    fetch(UPDATE_TITLE + task.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: inlineInput }),
    })
      .then((res: Response) => {
        if (res.ok) return fetch("http://127.0.0.1:3000/api/v1/tasks");
        return Promise.reject("Cannot Update, something went wrong...");
      })
      .then((res: Response) => res.json())
      .then((data: MyResponse) => setTasks(data.tasks))
      .catch((error: Error) => {
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
              taskRef.current?.classList.toggle("active");
            }}
          ></label>
          <input
            placeholder={task.title}
            onKeyDown={({ key, target }: React.KeyboardEvent<HTMLInputElement>) => {
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
          <span className={`${hasDatePassed(String(task.date)) && "time-limit"}`}>
            &nbsp;
            {String(task.date)}
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
