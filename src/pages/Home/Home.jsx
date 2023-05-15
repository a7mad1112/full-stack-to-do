import Main from "../../component/main/Main";
import { useContext } from "react";
import { tasksContext } from "../../context/tasksContext";
const Home = () => {
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
