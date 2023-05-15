import Main from "../../component/main/Main";

const Week = () => {
  // function to return tasks for the next week
function getTasksForNextSevenDays(tasks = []) {
  const today = new Date(); // get today's date
  const nextSevenDays = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7 // change this to 6 to include the current day
  ); // get the date for 7 days from now
  const currentTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date); // convert the task's date to a Date object
    return taskDate >= today && taskDate <= nextSevenDays;
  });
  return currentTasks;
}
  const tasks = getTasksForNextSevenDays([]);
  return (
    <Main
      currPage={{
        title: "Week",
        tasks,
      }}
    />
  );
};

export default Week;
