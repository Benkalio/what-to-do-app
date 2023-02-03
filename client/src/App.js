import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const userEmail = 'tennyson@test.com';

  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);

      const jsonResponse = await response.json()
      setTasks(jsonResponse)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => getData, []);
  console.log(tasks);

  // SORT TASK BY DATE
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listName={'New Year Resolution'} getData={getData} />
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
    </div>
  );
}

export default App;
