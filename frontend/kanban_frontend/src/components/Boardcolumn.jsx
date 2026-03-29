import React, { useState } from "react";
import Taskcard from "./Taskcard";
import AddTask from "./AddTask";
import { Draggable } from "@hello-pangea/dnd";

const Boardcolumn = ({ list, onTaskCreated }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [lists, setLists] = useState([]);


  return (
    <div className="bg-[#f1f5f9] p-4 rounded-xl w-50">



      <div className="space-y-3">
        {list.tasks?.map((task, index) => (

          <Draggable
            key={task.id}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                < Taskcard key={task.id} task={task} />
              </div>
            )}
          </Draggable>         
        ))}
      </div>

      <button className="mt-3 text-sm text-gray-500" onClick={() => setShowAddTask(true)} >
        + Add Task
      </button>

      {showAddTask && (
        <AddTask
          listId={list.id}
          onTaskCreated={(task) => {
            onTaskCreated(task);
            setShowAddTask(false);
          }}
          closeModal={() => setShowAddTask(false)}
        />
      )}
    </div>
  );
};

export default Boardcolumn;