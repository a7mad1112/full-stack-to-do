import Main from "../../component/main/Main";

const Today = () => {
  // function that filter the tasks and return the tasks with current day
  function getTasksForCurrentDay(tasks = []) {
    const today = new Date().toDateString(); // get today's date in the format "Day Month Date Year"
    const currentTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date).toDateString(); // convert the task's date to the same format
      return taskDate === today; // return true if the task's date matches today's date
    });
    return currentTasks;
  }

  const tasks = getTasksForCurrentDay([]);
  return (
    <Main
      currPage={{
        title: "Today",
        tasks,
      }}
    />
  );
};

export default Today;
