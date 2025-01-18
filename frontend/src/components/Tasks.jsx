import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

// Component to display and manage tasks
const Tasks = () => {
  // State to store tasks, task title, and editing states
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Get tasks from API
        const { data } = await API.get("/tasks");
        setTasks(data);
      } catch (error) {
        // Handle session expiry
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchTasks();
  }, [navigate]);

  // Function to add a new task
  const addTask = async () => {
    try {
      // Post new task to API
      const { data } = await API.post("/tasks", { title });
      setTasks([...tasks, data]);
      setTitle(""); // Clear input field
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add task");
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      // Delete task by ID
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task._id);
    setEditingTitle(task.title);
  };

  // Cancel editing mode
  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  // Save edited task
  const saveEdit = async () => {
    try {
      // Update task with new title
      const { data } = await API.put(`/tasks/${editingId}`, { title: editingTitle });
      setTasks(tasks.map((task) => (task._id === editingId ? data : task)));
      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <div className="todo">
      <div className="container">
        <div className="tasks-container">
          <div className="tasks-header">
            <h2>My Tasks</h2>
            <div className="add-task-form">
              <input
                type="text"
                placeholder="Add new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
              />
              <button onClick={addTask} className="btn btn-primary">
                Add Task
              </button>
            </div>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                {editingId === task._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="input-field"
                    />
                    <button onClick={saveEdit} className="btn btn-success">
                      Save
                    </button>
                    <button onClick={cancelEditing} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{task.title}</span>
                    <div className="task-actions">
                      <button
                        onClick={() => startEditing(task)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
