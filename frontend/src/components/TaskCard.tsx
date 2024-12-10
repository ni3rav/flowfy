import { useState } from "react";
import { Card } from "flowbite-react";
import { Task } from "../lib/models";
// import Draggable from "react-draggable";

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// interface Position {
//   x: number;
//   y: number;
// }

export function TaskCard({ task }: { task: Task }) {
  const [updated, setUpdated] = useState<string>(
    formatTimestamp(task.updatedAt)
  );
  // const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  // const handleDrag = (e: unknown, data: Position) => {
  //   setPosition({ x: data.x, y: data.y });
  // };

  return (
    // <Draggable position={position} onDrag={handleDrag} bounds="parent">
    <div className="cursor-move">
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {task.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {task.text ? task.text : ""}
        </p>
        <p className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
          {task.createdAt && task.createdAt
            ? `${updated} • ${formatTimestamp(task.createdAt)}`
            : ""}
        </p>
      </Card>
    </div>
    // </Draggable>
  );
}
