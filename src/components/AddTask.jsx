import React, { useState, useEffect } from 'react'
import ListTasks from './ListTasks'
import axios from 'axios'

export default function AddTask() {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState("")
    const [time, setTime] = useState("")

    const [isChecked, setIsChecked] = useState(false)

    const [isAdd, setIsAdd] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3000/tasks")
            .then(res =>
                setTasks(res.data)
            )
    }, [])

    const handleSaveTask = (task, time, isReminder) => {
        axios.post("http://localhost:3000/tasks", {
            "task": task,
            "time": time,
            "isReminder": isReminder
        })
            .then(res => setTasks([...tasks, res.data]))
    }

    const handleDeleteTask = (taskId) => {
        window.confirm("Do you want to delete task?") ?
        axios.delete("http://localhost:3000/tasks/" + taskId)
            .then(res => {
                if (res.status == 200) {
                    setTasks(tasks.filter(task => task.id !== taskId))
                } else {
                    alert("Delete Error")
                }
            }) : <div></div>
    }

    return (
        <div className='layout'>
            <div className='header-container'>
                <h1>Task Tracker</h1>
                {isAdd ?
                    (<button className="close-button" onClick={() => setIsAdd(!isAdd)}>Close</button>)
                    : (<button className="add-button" onClick={() => setIsAdd(!isAdd)}>Add</button>)}
            </div>

            {!isAdd ? (<div className='addTask-container'>
                <div className='form-group'>
                    <label htmlFor="task">Task</label><br />
                    <input id="task" type="text" placeholder='Add Task' value={task} onChange={(e) => setTask(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="time">Day & Time</label><br />
                    <input id="time" type="date" placeholder='Add Day & Time' value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className='check-form'>
                    <label htmlFor="">Set Reminder</label>
                    <input type="checkbox" name="" id="" checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                </div>
                <button className="save-button" onClick={() => {
                    if (task !== "" && time !== "") {
                        handleSaveTask(task, time, isChecked)
                        setTask("")
                        setTime("")
                        setIsChecked(false)
                    } else {
                        alert("Please input task and time!")
                    }
                }}>Save Task</button>
            </div>) : (<div></div>)}
            <ListTasks tasks={tasks} handleDeleteTask={handleDeleteTask} />
        </div>
        
    )
}
