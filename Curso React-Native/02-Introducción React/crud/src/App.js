import { isEmpty, size } from "lodash";
import React, { useState, useEffect } from "react";
import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "./actions";

///El use effect no sirve para cuando la pagina carga
/// el use state es para manejar los estados de la aplicación (maneja las variables globales)

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setIdTask] = useState("");
  const [error, setError] = useState("");
  const [nameColection, setNameColection] = useState("tasks");

  useEffect(() => {
    (async () => {
      const result = await getCollection(nameColection);

      if (result.statusResponse) {
        setTasks(result.data);
      }
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(task)) {
      setError("Debes ingresar una tarea");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument(nameColection, { name: task });

    console.log(result);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setTasks([...tasks, { id: result.data.id, name: task }]);
    setTask("");
  };

  const deleteTask = async (id) => {
    const result = await deleteDocument(nameColection, id);

    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  const editTask = (task) => {
    setTask(task.name);
    setEditMode(true);
    setIdTask(task.id);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await updateDocument(nameColection, id, { name: task });

    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editedTasks = tasks.map((item) =>
      item.id == id ? { id, name: task } : item
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
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
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
