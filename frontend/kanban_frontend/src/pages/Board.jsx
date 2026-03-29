// pages/Board.jsx
import React, { useEffect } from "react";
import Boardcolumn from "../components/Boardcolumn";
import Sidebar from "../components/Sidebar";
import BoardNavbar from "../components/BoardNavbar";
import axios from "axios";

import { useParams } from "react-router-dom";
import AddList from "../components/AddList";
import { useBoards } from "../context/Globalcontext";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const Board = () => {
  const { lists, setLists, fetchBoardData, addTask,boardData  } = useBoards();
  const { id } = useParams();

  useEffect(() => {
    fetchBoardData(id);
  }, [id]);

  const handleNewList = (newList) => {
    setLists((prev) => [...prev, newList]);
  };

  const updateTaskPositions = async (list) => {
    const token = localStorage.getItem("access");

    try {
      for (let i = 0; i < list.tasks.length; i++) {
        const task = list.tasks[i];

        await axios.patch(
          `http://127.0.0.1:8000/api/tasks/update/${task.id}/`,
          {
            position: i,
            list: list.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err) {
      console.log("Error updating positions:", err.response?.data);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // same place drop
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // ✅ create deep copy (IMPORTANT)
    const newLists = JSON.parse(JSON.stringify(lists));

    const sourceList = newLists.find(
      (l) => l.id.toString() === source.droppableId
    );

    const destList = newLists.find(
      (l) => l.id.toString() === destination.droppableId
    );

    const draggedTask = sourceList.tasks[source.index];

    // remove from source
    sourceList.tasks.splice(source.index, 1);

    // add to destination
    destList.tasks.splice(destination.index, 0, draggedTask);

    // update UI instantly
    setLists(newLists);

    try {

      await updateTaskPositions(sourceList);

      if (sourceList.id !== destList.id) {
        await updateTaskPositions(destList);
      }
    } catch (err) {
      console.log("Error updating task:", err.response?.data);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">

      <BoardNavbar board={boardData} id={id} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 p-6 overflow-x-auto w-full">

            {lists.map((col) => (
              <Droppable droppableId={col.id.toString()} key={col.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 rounded-2xl p-4 min-w-[280px] shadow-sm"
                  >
                    <h3 className="font-bold text-lg mb-4">
                      {col.title}
                    </h3>

                    <Boardcolumn
                      list={col}
                      onTaskCreated={(task) => addTask(col.id, task)}
                    />

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

            <AddList boardId={id} onListCreated={handleNewList} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;