import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const API = "http://localhost:3000";

function App() {
  const [user, setUser] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          getUserTasks(user.id);
        });
      }
    });
  }, []);

  // useEffect(() => {
  //   fetch(API + `/users/${user.id}/tasks`)
  //     .then((r) => r.json())
  //     .then(setTasks);
  // }, []);

  if (!user) return <LandingPage onLogin={handleLogin} />;

  async function getUserTasks(id) {
    const resp = await fetch(API + `/users/${id}/tasks`);
    if (resp.ok) {
      const tasks = await resp.json();
      console.log(tasks);
      setTasks(tasks);
    }
  }

  function handleLogin(user) {
    setUser(user);
    getUserTasks(user.id);
  }

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(API + "/tasks/" + id);
    const data = await res.json();
    return data;
  };

  //Add task
  const addTask = async (task) => {
    const res = await fetch(API + "/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setTasks([...tasks, data]);
    }
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(API + "/tasks/" + id, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(API + "/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const onMarkComplete = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, completed: !taskToToggle.completed };

    const res = await fetch(API + "/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const onToggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      } else {
        console.log("else");
      }
    });
  };

  return (
    <Router>
      <div className={isDarkMode ? "container dark" : "container"}>
        <button onClick={handleLogout}>Logout</button>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
        <div className="divider"></div>
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && (
                <>
                  <AddTask onAdd={addTask} user={user} />
                  <div className="divider"></div>
                </>
              )}
              {tasks.length > 0 ? (
                <TaskList
                  onMarkComplete={onMarkComplete}
                  tasks={tasks}
                  isDarkMode={isDarkMode}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks to show"
              )}
            </>
          )}
        />
        {/* <TaskList tasks = {tasks} onToggle = {toggleReminder} onDelete = {deleteTask} /> */}
      </div>
    </Router>
  );
}

export default App;
