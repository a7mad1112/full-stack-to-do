type showing = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

type inputsValue = {
  title: string;
  assignee: string;
  details: string;
  date: Date;
  priority: string;
  isCompleted: boolean;
};
type Task = inputsValue & {id: number};

type InputsErrors = {
  title?: string;
  assignee?: string;
}

type Tasks = Task[];


// type MyResponse = tasks & {
//   message: string;
// }

type MyResponse = {
  message: string;
  tasks: Tasks
}

type GlobalContext = {
  tasks?: Task[];
  currTask?: Task;
  setCurrTask?: any;
  setTasks?: any;
}

export { showing, Task, Tasks, InputsErrors, MyResponse, GlobalContext, inputsValue };
