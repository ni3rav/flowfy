import { useEffect, useState } from "react";
import { Task } from "./lib/models";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch("/api/tasks", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tasks = await response.json();

        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        alert(String(error));
      }
    };

    loadTasks();
  }, []);

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <h1>{task.title}</h1>
          <p>{task.text}</p>
        </div>
      ))}
    </div>
  );
}
export default App;
