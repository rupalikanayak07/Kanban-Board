// components/TaskCard.jsx
import React from "react";

const Taskcard = ({ task }) => {
  if (!task) return null
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-3 hover:shadow-lg transition">

      <h4 className="font-semibold text-gray-800">
        {task.title}
      </h4>

      <p className="text-sm text-gray-800 mt-1">
        {task.description || "No description"}
      </p>
     

    </div>
  );
};

export default Taskcard;