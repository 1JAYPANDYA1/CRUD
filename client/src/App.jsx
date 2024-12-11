import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentdata, setCurrentData] = useState({
    name: "", duration: ""
  })
  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/todo/fetch')
    setTodos(response.data)
    setLoading(false)
  }
  const deleteTodo = async (todoId) => {
    setLoading(true)
    console.log("id is : ", todoId)
    const response = await axios.delete('http://localhost:3000/todo/delete', { data: { todoId } },)
    fetchTodos()
  }
  const addtodo = async () => {
    console.log("data is : ", currentdata)
    const response = await axios.post('http://localhost:3000/todo/add', currentdata)
    setCurrentData({ name: "", duration: "" })
    fetchTodos()
  }
  useEffect(() => { fetchTodos() }, [])
  if (loading) {
    return <h1>Loading Please Wait.....</h1>
  }
  return (
    <>
      {
        todos.map((value, index) => (
          <div key={index} className='main'>
            <form>
              <label htmlFor="name">Task : </label>
              <input type="text" name="name" value={value.name} />
              <label htmlFor="name">Duration : </label>
              <input type="text" name="duration" value={value.duration} />
              <button className='btn' onClick={() => deleteTodo(value._id)}>x</button>
            </form>
          </div>
        ))
      }
      <div>
        <form>
          <label htmlFor='name'>Name : </label>
          <input type="text" name="name" placeholder='enter the task name' onChange={(e) => { currentdata.name = e.target.value }} />
          <label htmlFor='duration'>duration : </label>
          <input type="text" name="duration" placeholder='enter the task duration' onChange={(e) => { currentdata.duration = e.target.value }} />
          <button onClick={() => addtodo()}>Add Task</button>
        </form>
      </div>
    </>
  )
}

export default App
