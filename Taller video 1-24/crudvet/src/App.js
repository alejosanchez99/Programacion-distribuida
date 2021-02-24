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
import SaveIcon from '@material-ui/icons/Save';
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
  const [patient, setPatient] = useState();
  const [idPatient, setIdPatient] = useState();
  const [patients, setPatients] = useState([]);
  const [nameCollection] = useState("patients");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getCollection(nameCollection);

      if (result.statusResponse) {
        setPatients(result.data);
      }
    })();
  }, []);

  const handleInputChange = (event) => {
    setPatient({
      ...patient,
      [event.target.name]: event.target.value,
    });
  };

  const openModalConfirmDelete = (idPacient) => {
    setIdPatient(idPacient);
    setEditMode(false);
    setSeeModalConfirmDelete(!seeModalConfirmDelete);
  };

  const openModal = () => {
    setEditMode(false);
    setPatient("");
    setSeeModal(!seeModal);
  };

  const addPacient = async (e) => {
    e.preventDefault();
    const result = await addDocument(nameCollection, patient);

    if (!result.statusResponse) {
      return;
    }

    setPatients([...patients, { id: result.data.id, ...patient }]);
    setSeeModal(!seeModal);
  };

  const editPacient = (patient) => {
    setPatient(patient);
    setEditMode(true);
    setSeeModal(!seeModal);
  };

  const updatePacient = async (e) => {
    e.preventDefault();

    const result = await updateDocument(nameCollection, patient.id, patient);

    if (!result.statusResponse) {
      return;
    }

    const editedPacients = patients.map((item) =>
      item.id == patient.id ? patient : item
    );

    setPatients(editedPacients);
    setEditMode(false);
    setPatient("");
    setSeeModal(false);
  };

  const deletePacient = async () => {
    const result = await deleteDocument(nameCollection, idPatient);

    if (!result.statusResponse) {
      return;
    }
    const filteredPatients = patients.filter(
      (patient) => patient.id !== idPatient
    );
    setPatients(filteredPatients);
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
            <SaveIcon className="save-icon" />
          </button>
        </div>
      </div>
      <hr />

      <table className="table table-hover mt-5">
        <thead className="table-dark">
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
          {patients.map((patient) => (
            <tr>
              <td>{patient.petName}</td>
              <td>{patient.petType}</td>
              <td>{patient.petBreed}</td>
              <td>{patient.petDateOfBirth}</td>
              <td>{patient.ownerName}</td>
              <td>{patient.ownerPhone}</td>
              <td>{patient.ownerAddress}</td>
              <td>{patient.ownerEmail}</td>
              <td>
                <div className="row">
                  <IconButton onClick={() => editPacient(patient)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => openModalConfirmDelete(patient.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={seeModal}>
        <ModalHeader>{editMode ? "Editar paciente" : "Crear paciente"}</ModalHeader>
        <Form onSubmit={editMode ? updatePacient : addPacient}>
          <ModalBody>
            <FormGroup>
              <Label>Nombre mascota</Label>
              <Input
                type="text"
                placeholder="Ingrese el nombre de la mascota"
                onChange={handleInputChange}
                name="petName"
                defaultValue={editMode ? patient.petName : ""}
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
                defaultValue={editMode ? patient.petType : ""}
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
                defaultValue={editMode ? patient.petBreed : ""}
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
                defaultValue={editMode ? patient.petDateOfBirth : ""}
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
                defaultValue={editMode ? patient.ownerName : ""}
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
                defaultValue={editMode ? patient.ownerPhone : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Dirección propietario</Label>
              <Input
                type="text"
                placeholder="Ingrese la dirección del propietario"
                onChange={handleInputChange}
                name="ownerAddress"
                defaultValue={editMode ? patient.ownerAddress : ""}
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
                defaultValue={editMode ? patient.ownerEmail : ""}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-modal mr-2"
              onClick={() => openModal()}
            >
              Cerrar
            </Button>
            <Button
              className="btn  btn-modal btn-success ml-2"
              type="submit"
            >
              {editMode ? "Editar" : "Crear"}
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
            className="btn-modal mr-2"
          >
            Cerrar
          </Button>
          <Button
            className="btn btn-modal btn-success ml-2"
            type="submit"
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
