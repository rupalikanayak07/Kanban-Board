import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTask = ({ listId, onTaskCreated, closeModal }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState(null);
    const [dueDate, setDueDate] = useState("");
    const [created_at, setCreated] = useState("");
    const [users, setUsers] = useState([]);
    const [existingTasks, setExistingTasks] = useState([]);

    const token = localStorage.getItem("access");


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/users/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };
        fetchUsers();
    }, [token]);

    const handleAddTask = async () => {
        if (!title.trim()) return;

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/tasks/",
                {
                    title,
                    description,
                    assigned_to: assignedTo,
                    due_date: dueDate || null,
                    list: listId,
                    created_at: created_at,
                    position: existingTasks.length + 1, 
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onTaskCreated(res.data);
            setTitle("");
            setDescription("");
            setAssignedTo(null);
            setDueDate("");
            setCreated('')
            closeModal();
        } catch (err) {
            console.log("Error adding task:", err.response?.data || err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Add Task</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                />

               

              

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={handleAddTask}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTask;