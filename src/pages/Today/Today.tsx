import { useContext, useEffect, useState } from "react";
import Main from "../../component/main/Main";
import { tasksContext } from "../../context/tasksContext";
import { Tasks } from "../../types/types";

const Today: React.FC = () => {
  // function that filter the tasks and return the tasks with current day
  function getTasksForCurrentDay(tasks: Tasks = []): Tasks {
    const today: String = new Date().toDateString(); // get today's date in the format "Day Month Date Year"
    const currentTasks: Tasks = tasks.filter((task) => {
      const taskDate: String = new Date(task.date).toDateString(); // convert the task's date to the same format
      return taskDate === today; // return true if the task's date matches today's date
    });
    return currentTasks;
  }

  const { tasks } = useContext(tasksContext);

  const [tasksToday, setTasksToday] = useState<Tasks>([]);

  useEffect(() => {
    setTasksToday(getTasksForCurrentDay(tasks));
  }, [tasks]);

  return (
    <Main
      currPage={{
        title: "Today",
        tasks: tasksToday,
      }}
    />
  );
};

export default Today;
