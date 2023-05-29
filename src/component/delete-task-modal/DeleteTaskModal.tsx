import "./delete-task-modal.css";
import React, { useContext, useEffect } from "react";
import { tasksContext } from "../../context/tasksContext.ts";
import { MyResponse, showing, Task } from "../../types/types.ts";
const DeleteTaskModal: React.FC<showing> = ({ isShow, setIsShow }) => {
  const DELETE_URL: string = "http://127.0.0.1:3000/api/v1/tasks/delete?id=";

  const { currTask, setTasks } = useContext(tasksContext);
  useEffect(() => {}, [currTask]);
  const handleDelete = () => {
    fetch(DELETE_URL + currTask?.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res: Response) => {
        if (res.ok) {
          return fetch("http://127.0.0.1:3000/api/v1/tasks");
        }
        throw new Error("Failed to delete task");
      })
      .then((res: Response) => res.json())
      .then((data: MyResponse) => setTasks(data.tasks))
      .catch((err: Error) => {
        console.error(err);
      })
      .finally(() => {
        setIsShow(false);
      });
  };

  return (
    <div
      id="delete-task-modal"
      className={`my-modal ${isShow && "show-modal"}`}
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) setIsShow(false);
      }}
    >
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>Delete Task</h3>
          <span
            className="close-delete-task-form close-task-form"
            onClick={() => setIsShow(false)}
          >
            <i className="ri-close-circle-line"></i>
          </span>
        </header>

        <div className="p-3" id="delete-task-form">
          <div className="form-group">
            <p>
              Are you sure Delete <strong>"{currTask?.title}"</strong> Task
            </p>
          </div>
          <div className="form-group mt-3 d-flex gap-3 justify-content-end">
            <button
              id="cancel-button"
              type="submit"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </button>
            <button id="delete-task" type="submit" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
