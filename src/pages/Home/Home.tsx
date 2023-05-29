import Main from "../../component/main/Main.tsx";
import { useContext } from "react";
import { tasksContext } from "../../context/tasksContext.ts";
const Home: React.FC = () => {
  const { tasks } = useContext(tasksContext);
  return (
    <Main
      currPage={{
        title: "Home",
        tasks
      }}
    />
  );
};

export default Home;
