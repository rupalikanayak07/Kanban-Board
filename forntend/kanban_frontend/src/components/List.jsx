import React, { useState } from 'react'

const List = ({list,boardId}) => {
  const [tasks, setTasks] = useState(list.tasks || []);
  const [showAddTask, setShowAddTask] = useState(false);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="bg-gray-100 p-2 rounded-2xl min-w-[250px]">
      <h3 className="font-semibold mb-2">{list.title}</h3>

      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-2 rounded mb-2">
          {task.title}
        </div>
      ))}

      <button
        onClick={() => setShowAddTask(true)}
        className="text-purple-500 mt-2"
      >
        + Add Task
      </button>

      {showAddTask && (
        <AddTask
          listId={list.id}
          onTaskCreated={handleTaskCreated}
          closeModal={() => setShowAddTask(false)}
        />
      )}
    </div>
  );
}

export default List