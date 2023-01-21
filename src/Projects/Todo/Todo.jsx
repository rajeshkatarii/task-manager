import React from 'react'
import { useState } from 'react'
import './Todo.css'
function Todo() {
    const [tasks,setTasks]=useState([])
    const [task,setTask] = useState("")
    const [taskEditing,setTaskEditing]= useState(null)
    const[editingText,setEditingText] = useState('')

    React.useEffect(()=>{
      const json = localStorage.getItem("task");
      const loadedTasks = JSON.parse(json);
      if(loadedTasks){
        setTasks(loadedTasks);
      }
    },[]);
    
    React.useEffect(()=>{
      const json = JSON.stringify(tasks);
      localStorage.setItem('tasks',json);
    },[tasks]);
       
    function handleSubmit(e){
       e.preventDefault()

       const newTask={
        id:new Date().getTime(),
        text:task,
        complete:false,
       }
       setTasks([...tasks].concat(newTask))
       setTask("")
    }
    function deleteTask(id){
        const updateTasks =[...task].filter((task) => task.id !== id);
        setTasks(updateTasks);
    }
    function toggleComplete(id){
      const updateTasks=[...tasks].map((task) => {
        if (task.id === id) {
          task.completed =! task.completed;
        }
        return task;
      })
      setTasks(updateTasks);
    }
   
    function submitEdits(id){
     const updatedTasks=[...task].map((task)=>{
      if(task.id===id){
        task.text = editingText;
      }
      return task;
     })
      setTasks(updatedTasks);
      setTaskEditing(null)
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter-Task'
           onChange={(e)=>setTask(e.target.value)} value={task}/>
          <button type='sumbit'>Add Task</button>  
        </form> 
        {tasks.map((task) => (
        <div key={task.id} className="task">
          <div className="task-text">
            <input
              type="checkbox"
              id="completed"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            
            {task.id === taskEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{task.text}</div>
            )}
          </div>
          <div className="task-actions">
            {task.id === taskEditing ? (
              <button onClick={() => submitEdits(task.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTaskEditing(task.id)}>Edit</button>
            )}

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
        ))}
         </div>
       
  )}

export default Todo