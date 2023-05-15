import Main from "../../component/main/Main";

const Home = () => {
  return (
    <Main
      currPage={{
        title: "Home",
        tasks: [
          {
            title: "task4",
            assignee: "dali",
            details: "hi from postman",
            date: "2023-05-09 21:27:51.000000",
            priority: "medium",
            isCompleted: true,
            id: 1
          },
        ],
      }}
    />
  );
};

export default Home;
