import { Link } from "react-router-dom";

export default function ListTasks({tasks, handleDeleteTask}) {
    return (
        <>
            {tasks?.length > 0 ? (tasks.map((task) =>
                <div className={`task ${task.isReminder ? "isReminder" : ""}`} key={task.id}>
                    <div>
                        <p>{task.task}</p>
                        <p>{task.time}</p>
                    </div>
                    <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>X</button>
                </div>)) : <div>No Tasks to Show</div>}
            <div className="about">
                <p>MiniProject API & Asynchronous © 2023</p>
                <Link to="/about">About</Link>
            </div>
        </>
    )
}
