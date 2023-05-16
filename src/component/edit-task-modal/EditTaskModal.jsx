import { useContext, useEffect, useState } from "react";
import { tasksContext } from "../../context/tasksContext";

const EditTaskModal = ({ isShow, setIsShow }) => {
  const PUT_URL = "http://127.0.0.1:3000/api/v1/tasks/update/task?id=";
  const initialValue = {
    title: "",
    assignee: "",
    details: "",
    date: "",
    priority: "none",
  };
  const { currTask } = useContext(tasksContext);
  useEffect(() => {
    setInputsValue({
      title: currTask.title,
      assignee: currTask.assignee,
      details: currTask.details,
      priority: currTask.priority,
      date: currTask.date,
      isCompleted: currTask.isCompleted,
    });
  }, [currTask]);

  const [inputsValue, setInputsValue] = useState(initialValue);
  const [inputsErrors, setInputsErrors] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputsValue((prevInputsValue) => ({
      ...prevInputsValue,
      [name]: value,
    }));
    setInputsErrors(validate({ ...inputsValue, [name]: value }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title?.trim()) {
      errors.title = "Title name is required!";
    } else if (parseInt(values.title.trim()?.at(0))) {
      errors.title = "This is not a valid task name!";
    }

    if (!values.assignee?.trim()) errors.assignee = "Assignee is required!";
    else if (parseInt(values.assignee.trim()?.at(0)))
      errors.assignee = "This is not a valid Assignee!";

    return errors;
  };

  const handleSubmit = (eve) => {
    eve.preventDefault();
    // console.log(inputsValue);
    fetch(PUT_URL + currTask.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputsValue),
    })
    .then(res => {
      if(res.ok)
        setIsShow(false);
    })
    .catch(err => {
      console.error(err);
    })
  };

  return (
    <div
      onClick={(ev) => {
        ev.target === ev.currentTarget && setIsShow(false);
      }}
      id="add-task-form"
      className={`my-modal ${isShow && "show-modal"}`}
    >
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>Edit Task</h3>
          <span className="close-add-task-form close-task-form">
            <i className="ri-close-circle-line"></i>
          </span>
        </header>
        <form className="p-3" id="add-task-modal" onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-name1">
              Title
            </label>
            <input
              onFocus={({ target }) => {
                target.select();
              }}
              onChange={handleChange}
              value={inputsValue.title ?? ""}
              className="d-block"
              name="title"
              type="text"
              id="task-name1"
            />
            <p className="title-err">{validate(inputsValue)?.title}</p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-assignee2">
              Assignee
            </label>
            <input
              onFocus={({ target }) => {
                target.select();
              }}
              onChange={handleChange}
              value={inputsValue.assignee ?? ""}
              className="d-block"
              name="assignee"
              type="text"
              id="task-assignee2"
            />
            <p className="title-err">{validate(inputsValue)?.assignee}</p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-details2">
              Details (notes)
            </label>
            <textarea
              onFocus={({ target }) => {
                target.select();
              }}
              onChange={handleChange}
              value={inputsValue.details ?? ""}
              id="task-details2"
              name="details"
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <div className="row gap-3">
              <div className="col p-0">
                <label htmlFor="select-priority2" data-color="">
                  Priority
                </label>
                <select
                  onChange={handleChange}
                  value={inputsValue.priority ?? "none"}
                  className="d-block"
                  name="priority"
                  id="select-priority2"
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="col p-0">
                <label htmlFor="due-date2">Due Date</label>
                <input
                  onChange={handleChange}
                  value={inputsValue.date ?? ""}
                  name="date"
                  type="date"
                  id="due-date2"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <button id="add-task" type="submit">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
