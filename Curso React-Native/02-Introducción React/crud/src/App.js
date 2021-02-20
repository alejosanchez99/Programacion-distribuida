import { isEmpty,size } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }

    const newTask = {
      idTask: shortid.generate(),
      nameTask: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (idTask) => {
    const filteredTask = tasks.filter(task => task.idTask !== idTask);
    setTasks(filteredTask);
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          {
            size(tasks) == 0 ? (
              <h5 className="text-center">Aún no hay tareas programadas.</h5>
            ) : (
              <ul className="list-group">
                {
                  tasks.map((task) => (
                    <li className="list-group-item" key={task.idTask}>
                      <span className="lead">{task.nameTask}</span>
                      <button className="btn btn-danger btn-sm float-right mx-2"
                        onClick={() => deleteTask(task.idTask)}
                      >
                        Eliminar
                  </button>
                      <button
                        className="btn btn-warning btn-sm float-right mx-2">
                        Editar
                  </button>
                    </li>
                  ))}
              </ul>
            )
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">Agregar Tarea</h4>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea ..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button className="btn btn-dark btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
