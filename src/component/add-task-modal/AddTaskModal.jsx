import { useContext, useEffect, useRef, useState } from "react";
import "./add-task-form.css";
import { tasksContext } from "../../context/tasksContext";

const AddTaskForm = ({ isShow, setIsShow }) => {
  const { setTasks } = useContext(tasksContext);
  const POST_URL = "http://localhost:3000/api/v1/tasks/addtask";
  const modal = useRef();
  const form = useRef();
  const initialValue = {
    title: "",
    assignee: "",
    details: "",
    date: "",
    priority: "none",
  };
  const [inputsErrors, setInputsErrors] = useState({});
  const [inputsValue, setInputsValue] = useState(initialValue);
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setInputsValue((prevInputsValue) => ({
      ...prevInputsValue,
      [name]: value,
    }));
    setInputsErrors(validate({ ...inputsValue, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(validate(inputsValue)).length !== 0) return;
    async function addTask() {
      // console.log(inputsValue);
      const task = {
        title: inputsValue.title,
        assignee: inputsValue.assignee,
        details: inputsValue.details ?? "",
        date: inputsValue.date ? new Date(inputsValue.date) : null,
        priority: inputsValue.priority ?? "none",
        isCompleted: false,
      };
      await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return fetch("http://127.0.0.1:3000/api/v1/tasks");
        })
        .then(res => res.json())
        .then((data) => setTasks(data.tasks));
    }
    addTask();
    setIsShow(false);
  };

  useEffect(() => {
    setInputsValue(initialValue);
    setInputsErrors({});
    form.current.reset();
  }, [isShow]);

  const validate = (values) => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = "Title name is required!";
    } else if (parseInt(values.title.trim()?.at(0))) {
      errors.title = "This is not a valid task name!";
    }

    if (!values.assignee.trim()) errors.assignee = "Assignee is required!";
    else if (parseInt(values.assignee.trim()?.at(0)))
      errors.assignee = "This is not a valid Assignee!";

    return errors;
  };

  return (
    <div
      id="add-task-form"
      ref={modal}
      className={`my-modal ${isShow && "show-modal"}`}
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsShow(false);
        // console.log("close the modal");
      }}
    >
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>New Task</h3>
          <span
            className="close-add-task-form close-task-form"
            onClick={() => setIsShow(false)}
          >
            <i className="ri-close-circle-line"></i>
          </span>
        </header>
        <form
          onSubmit={handleSubmit}
          className="p-3"
          id="add-task-modal"
          ref={form}
        >
          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-name">
              Title
            </label>
            <input
              onChange={handleChange}
              className="d-block"
              name="title"
              type="text"
              id="task-name"
            />
            <p className="title-err">{inputsErrors?.title}</p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-assignee">
              Assignee
            </label>
            <input
              onChange={handleChange}
              className="d-block"
              name="assignee"
              type="text"
              id="task-assignee"
            />
            <p className="title-err">{inputsErrors?.assignee}</p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-details">
              Details (notes)
            </label>
            <textarea
              onChange={handleChange}
              id="task-details"
              name="details"
              placeholder="Important details of your task..."
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <div className="row gap-3">
              <div className="col p-0">
                <label htmlFor="select-priority" data-color="">
                  Priority
                </label>
                <select
                  onChange={handleChange}
                  className="d-block"
                  name="priority"
                  id="select-priority"
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="col p-0">
                <label htmlFor="due-date">Due Date</label>
                <input
                  onChange={handleChange}
                  name="date"
                  type="date"
                  id="due-date"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <button id="add-task" type="submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
