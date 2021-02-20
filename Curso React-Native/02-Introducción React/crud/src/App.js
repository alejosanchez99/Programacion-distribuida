import { isEmpty, size } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idTask, setIdTask] = useState("");
  const [error, setError] = useState("");

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(task)) {
      setError("Debes ingresar una tarea");
      isValid = false;
    }

    return isValid;
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
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
    const filteredTask = tasks.filter((task) => task.idTask !== idTask);
    setTasks(filteredTask);
  };

  const editTask = (task) => {
    setTask(task.nameTask);
    setEditMode(true);
    setIdTask(task.idTask);
  };

  const updateTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const editedTasks = tasks.map((item) =>
      item.idTask == idTask ? { idTask, nameTask: task } : item
    );
    setTasks(editedTasks);
    setEditMode(false);
    setTask("");
    setIdTask("");
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          {size(tasks) == 0 ? (
            <li className="list-group-item">Aún no hay tareas programadas.</li>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.idTask}>
                  <span className="lead">{task.nameTask}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.idTask)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right mx-2"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modificar tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={editMode ? updateTask : addTask}>
            {error && <span className="text-danger mb-2">{error}</span>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea ..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
