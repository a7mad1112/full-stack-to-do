import { useState, useEffect } from "react";
import TaskItem from "../Task/Task.tsx";
import AddTaskForm from "../add-task-modal/AddTaskModal.tsx";
import RelaxImg from "../relax-img/RelaxImg.tsx";
import "./main.css";
import DeleteTaskModal from "../delete-task-modal/DeleteTaskModal.tsx";
import EditTaskModal from "../edit-task-modal/EditTaskModal.tsx";
import { Tasks } from "../../types/types.ts";

type props = {
  currPage: {
    title: string;
    tasks: Tasks;
  };
};
const Main: React.FC<props> = ({ currPage }) => {
  const { title, tasks } = currPage;
  const [currTasks, setCurrTasks] = useState<Tasks>(tasks);

  useEffect(() => {
    setCurrTasks(tasks);
  }, [tasks]);

  const completeTasks: Tasks = currTasks.filter((t) => !t.isCompleted);
  const unCompleteTasks: Tasks = currTasks.filter((t) => t.isCompleted);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState<boolean>(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value?.trim();
    setCurrTasks(() =>
      tasks.filter((t) => t.title.toLowerCase().includes(value.toLowerCase()))
    );
  };
  return (
    <section id="main-content" className="p-5 w-100">
      <header className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-3">{title}</h2>
        <label htmlFor="search">
          <span>Search: </span>
          <input type="search" id="search" onChange={handleSearch} />
        </label>
      </header>
      <div className="tasks-container w-100">
        {/* Add tasks Button */}
        {title === "Home" && (
          <div className="add-task w-100 rounded">
            <button
              className="w-100 rounded"
              onClick={() => setShowAddTaskModal(true)}
            >
              <i className="fa-solid fa-plus add-project"></i>
              <span>Add new task</span>
            </button>
          </div>
        )}
        {/* Accordion */}
        <div className="my-accordion">
          {completeTasks.length === 0 ? (
            <RelaxImg />
          ) : (
            completeTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                setShowDeleteTaskModal={setShowDeleteTaskModal}
                setShowEditTaskModal={setShowEditTaskModal}
              />
            ))
          )}
        </div>
      </div>
      <h2 className="fs-6 mt-4">Complete Tasks</h2>
      <div className="my-accordion complete-tasks">
        {unCompleteTasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            setShowDeleteTaskModal={setShowDeleteTaskModal}
            setShowEditTaskModal={setShowEditTaskModal}
          />
        ))}
      </div>
      <AddTaskForm isShow={showAddTaskModal} setIsShow={setShowAddTaskModal} />
      <EditTaskModal
        isShow={showEditTaskModal}
        setIsShow={setShowEditTaskModal}
      />
      <DeleteTaskModal
        isShow={showDeleteTaskModal}
        setIsShow={setShowDeleteTaskModal}
      />
    </section>
  );
};

export default Main;
