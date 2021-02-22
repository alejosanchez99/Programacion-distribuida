import "./App.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "./actions";

function App() {
  const [seeModal, setSeeModal] = useState(false);
  const [seeModalConfirmDelete, setSeeModalConfirmDelete] = useState(false);
  const [pacient, setPacient] = useState();
  const [idPacient, setIdPacient] = useState();
  const [pacients, setPacients] = useState([]);
  const [nameCollection] = useState("pacients");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getCollection(nameCollection);

      if (result.statusResponse) {
        setPacients(result.data);
      }
    })();
  }, []);

  const handleInputChange = (event) => {
    setPacient({
      ...pacient,
      [event.target.name]: event.target.value,
    });
  };

  const openModalConfirmDelete = (idPacient) => {
    setIdPacient(idPacient);
    setEditMode(false);
    setSeeModalConfirmDelete(!seeModalConfirmDelete);
  };

  const openModal = () => {
    setEditMode(false);
    setPacient("");
    setSeeModal(!seeModal);
  };

  const addPacient = async (e) => {
    e.preventDefault();
    const result = await addDocument(nameCollection, pacient);

    if (!result.statusResponse) {
      return;
    }

    setSeeModal(!seeModal);
  };

  const editPacient = (pacient) => {
    setPacient(pacient);
    setEditMode(true);
    setSeeModal(!seeModal);
  };

  const updatePacient = async (e) => {
    e.preventDefault();

    const result = await updateDocument(nameCollection, pacient.id, pacient);

    if (!result.statusResponse) {
      return;
    }

    setEditMode(false);
    setPacient("");
    setSeeModal(false);
  };

  const deletePacient = async () => {
    const result = await deleteDocument(nameCollection, idPacient);

    if (!result.statusResponse) {
      return;
    }
    const filteredPacient = pacients.filter((pacient) => pacient.id !== idPacient);
    setPacients(filteredPacient);
    setSeeModalConfirmDelete(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <h1>Pacientes de la veterinaria</h1>
        </div>
        <div className="col-6">
          <button
            className="btn-header btn btn-success mt-3 float-right mx-4"
            type="submit"
            onClick={() => openModal()}
          >
            Crear
          </button>
        </div>
      </div>
      <hr />

      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">Nombre mascota</th>
            <th scope="col">Tipo mascota</th>
            <th scope="col">Raza mascota</th>
            <th scope="col">Fecha de nacimiento mascota</th>
            <th scope="col">Nombres y apellidos propietario</th>
            <th scope="col">Teléfono propietario</th>
            <th scope="col">Dirección propietario</th>
            <th scope="col">Email propietario</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacients.map((pacient) => (
            <tr>
              <td>{pacient.petName}</td>
              <td>{pacient.petType}</td>
              <td>{pacient.petBreed}</td>
              <td>{pacient.petDateOfBirth}</td>
              <td>{pacient.ownerName}</td>
              <td>{pacient.ownerPhone}</td>
              <td>{pacient.ownerAddress}</td>
              <td>{pacient.ownerEmail}</td>
              <td>
                <div className="row">
                  <IconButton onClick={() => editPacient(pacient)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openModalConfirmDelete(pacient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={seeModal}>
        <ModalHeader>Crear paciente</ModalHeader>
        <Form onSubmit={editMode ? updatePacient : addPacient}>
          <ModalBody>
            <FormGroup>
              <Label>Nombre mascota</Label>
              <Input
                type="text"
                placeholder="Ingrese el nombre de la mascota"
                onChange={handleInputChange}
                name="petName"
                defaultValue={editMode ? pacient.petName : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Tipo mascota</Label>
              <Input
                type="text"
                placeholder="Ingrese el tipo de la mascota"
                onChange={handleInputChange}
                name="petType"
                defaultValue={editMode ? pacient.petType : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Raza mascota</Label>
              <Input
                type="text"
                placeholder="Ingrese la raza de la mascota"
                onChange={handleInputChange}
                name="petBreed"
                defaultValue={editMode ? pacient.petBreed : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Fecha de nacimiento mascota</Label>
              <Input
                type="date"
                placeholder="Ingrese la fecha de nacimiento de la mascota"
                onChange={handleInputChange}
                name="petDateOfBirth"
                defaultValue={editMode ? pacient.petDateOfBirth : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Nombres y apellidos propietario</Label>
              <Input
                type="text"
                placeholder="Ingrese nombres y apellidos del propietario"
                onChange={handleInputChange}
                name="ownerName"
                defaultValue={editMode ? pacient.ownerName : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Teléfono propietario</Label>
              <Input
                type="number"
                placeholder="Ingrese el teléfono del propietario"
                onChange={handleInputChange}
                name="ownerPhone"
                defaultValue={editMode ? pacient.ownerPhone : ""}
              />
            </FormGroup>
            <FormGroup>
              <Label>Dirección propietario</Label>
              <Input
                type="text"
                placeholder="Ingrese la dirección del propietario"
                onChange={handleInputChange}
                name="ownerAddress"
                defaultValue={editMode ? pacient.ownerAddress : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email propietario</Label>
              <Input
                type="email"
                placeholder="Ingrese el email del propietario"
                onChange={handleInputChange}
                name="ownerEmail"
                defaultValue={editMode ? pacient.ownerEmail : ""}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => openModal()}>Cerrar</Button>
            <Button 
            className="btn btn-success ml-2" 
            type="submit">
              Guardar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={seeModalConfirmDelete}>
        <ModalHeader>Confirmar eliminación</ModalHeader>
        <ModalBody>
          <p>¿Desea confirmar la eliminación del paciente?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => openModalConfirmDelete()}
          >
            Cerrar
          </Button>
          <Button
            className="btn btn-success ml-2" type="submit"
            onClick={() => deletePacient()}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
