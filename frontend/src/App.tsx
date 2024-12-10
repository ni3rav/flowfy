import { useEffect, useState } from "react";
import { Task } from "./lib/models";
import { TaskCard } from "./components/TaskCard";
import { NavigationBar } from "./components/Navbar";

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
      <NavigationBar />
      <div className="h-screen w-screen bg-gray-100 p-4 relative overflow-hidden">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
}
export default App;
