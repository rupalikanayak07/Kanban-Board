import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";



export const BoardsContext = createContext();

const Globalcontext = ({ children }) => {

    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);
    const [boardData, setBoardData] = useState({});


    const token = localStorage.getItem("access");

    // Fetch boards from backend
    const fetchBoards = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/boards/list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBoards(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching boards:", err.response?.data || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();

        const interval = setInterval(fetchBoards, 10000);
        return () => clearInterval(interval);
    }, []);

    const addBoard = (newBoard) => {
        setBoards((prev) => [...prev, newBoard]);
    };

    // list global
    const fetchBoardData = async (boardId) => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/board-data/${boardId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLists(res.data.lists);
            setBoardData(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    useEffect(() => {
        fetchBoardData();
    }, []);

    const addList = (newList) => {
        setLists((prev) => [...prev, { ...newList, tasks: [] }]);
    };


    // global task
    const addTask = (listId, newTask) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? { ...list, tasks: [...list.tasks, newTask] }
                    : list
            )
        );
    };


    const updateBoard = (updatedBoard) => {
        setBoards((prev) =>
            prev.map((b) => (b.id === updatedBoard.id ? updatedBoard : b))
        );
    };


   

    return (
        <BoardsContext.Provider
            value={{ boards, lists, setLists, loading, addBoard, updateBoard, fetchBoards, fetchBoardData, addList, addTask, boardData }}
        >
            {children}
        </BoardsContext.Provider>
    );
};

export const useBoards = () => useContext(BoardsContext);
export default Globalcontext