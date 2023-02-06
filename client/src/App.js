import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

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

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }
  , []);
  console.log(tasks);

  // SORT TASK BY DATE
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
        <>
        <ListHeader listName={'New Year Resolution'} getData={getData} />
        <p className="user-name">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>}
      <p className="copyright">&#169;Lucid Pages</p>
    </div>
  );
}

export default App;
