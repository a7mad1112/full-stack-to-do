import Layout from "./component/layout/Layout";
import { tasksContext } from "./context/tasksContext";
import { useEffect, useState } from "react";
function App() {
  const [currTask, setCurrTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const API_URL = "http://127.0.0.1:3000/api/v1/tasks";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
        } else {
          throw new Error("Error: Unable to fetch tasks");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <tasksContext.Provider value={{ tasks, currTask, setCurrTask, setTasks }}>
        <Layout />
      </tasksContext.Provider>
    </>
  );
}

export default App;
