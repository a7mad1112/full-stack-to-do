import { useContext, useEffect, useState } from "react";
import Main from "../../component/main/Main";
import { tasksContext } from "../../context/tasksContext";
import { Tasks } from "../../types/types";

const Week: React.FC = () => {
  // function to return tasks for the next week
  function getTasksForNextSevenDays(tasks: Tasks = []): Tasks {
    const today: Date = new Date(); // get today's date
    const nextSevenDays: Date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7 // change this to 6 to include the current day
    ); // get the date for 7 days from now
    const currentTasks: Tasks = tasks.filter((task) => {
      const taskDate: Date = new Date(task.date); // convert the task's date to a Date object
      return taskDate >= today && taskDate <= nextSevenDays;
    });
    return currentTasks;
  }

  const { tasks } = useContext(tasksContext);

  const [tasksWeek, setTasksWeek] = useState<Tasks>([]);

  useEffect(() => {
    setTasksWeek(getTasksForNextSevenDays(tasks));
  }, [tasks]);

  return (
    <Main
      currPage={{
        title: "Week",
        tasks: tasksWeek,
      }}
    />
  );
};

export default Week;
