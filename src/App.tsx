import Layout from "./component/layout/Layout.tsx";
import { tasksContext } from "./context/tasksContext.ts";
import { useEffect, useState } from "react";
import { MyResponse, Task, Tasks } from "./types/types.ts";
function App() {
  const [currTask, setCurrTask] = useState<Task>();
  const [tasks, setTasks] = useState <Tasks>([]);
  const API_URL: string = "http://127.0.0.1:3000/api/v1/tasks";
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: Response = await fetch(API_URL);
        if (response.ok) {
          const data: MyResponse = await response.json();
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
