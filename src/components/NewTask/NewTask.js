import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText,taskdata) => {
    const generatedId = taskdata.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://react-http-15ea6-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { text: taskText },
    },createTask.bind(null, taskText)); 
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
