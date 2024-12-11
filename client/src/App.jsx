import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({ name: '', duration: '' });
  const [editIndex, setEditIndex] = useState(null);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/todo/fetch');
    setTodos(response.data);
    setLoading(false);
  };

  const deleteTodo = async (todoId) => {
    setLoading(true);
    await axios.delete('http://localhost:3000/todo/delete', { data: { todoId } });
    fetchTodos();
  };

  const addTodo = async () => {
    await axios.post('http://localhost:3000/todo/add', currentData);
    setCurrentData({ name: '', duration: '' });
    fetchTodos();
  };

  const updateTodo = async (index) => {
    const todo = todos[index];
    await axios.put('http://localhost:3000/todo/update', todo);
    setEditIndex(null);
    fetchTodos();
  };

  const handleEditChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTodos = [...todos];
    updatedTodos[index][name] = value;
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <h1>Loading Please Wait.....</h1>;
  }

  return (
    <>
      {todos.map((value, index) => (
        <div key={index} className="main">
          <form>
            <label htmlFor="name">Task: </label>
            {editIndex === index ? (
              <input
                type="text"
                name="name"
                value={value.name}
                onChange={(e) => handleEditChange(e, index)}
              />
            ) : (
              <span>{value.name}   -- </span>
            )}
            <label htmlFor="duration">Duration: </label>
            {editIndex === index ? (
              <input
                type="text"
                name="duration"
                value={value.duration}
                onChange={(e) => handleEditChange(e, index)}
              />
            ) : (
              <span>{value.duration}</span>
            )}
            {editIndex === index ? (
              <button
                type="button"
                onClick={() => updateTodo(index)}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditIndex(index)}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              className="btn"
              onClick={() => deleteTodo(value._id)}
            >
              x
            </button>
          </form>
        </div>
      ))}
      <div>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter the task name"
            value={currentData.name}
            onChange={(e) =>
              setCurrentData({ ...currentData, name: e.target.value })
            }
          />
          <label htmlFor="duration">Duration: </label>
          <input
            type="text"
            name="duration"
            placeholder="Enter the task duration"
            value={currentData.duration}
            onChange={(e) =>
              setCurrentData({ ...currentData, duration: e.target.value })
            }
          />
          <button type="button" onClick={() => addTodo()}>
            Add Task
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
