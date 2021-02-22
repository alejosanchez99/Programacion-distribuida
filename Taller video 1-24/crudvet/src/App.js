import "./App.css";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import React, { useState } from "react";

function App() {
  const [seeModal, setSeeModal] = useState(false);
  const [pacient, setPacient] = useState([]);

  const openModal = () => {
    console.log("prueba");
    setSeeModal(!seeModal);
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

      <table class="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">Identificador</th>
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>

      <Modal isOpen={seeModal} className="modal-test">
        <ModalHeader>
          Crear paciente
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre mascota</Label>
            <Input
              type="text"
              placeholder="Ingrese el nombre de la mascota"
            />
          </FormGroup>
          <FormGroup>
            <Label>Tipo mascota</Label>
            <Input
              type="text"
              placeholder="Ingrese el tipo de la mascota"
            />
          </FormGroup>
          <FormGroup>
            <Label>Raza mascota</Label>
            <Input type="text"
              placeholder="Ingrese la raza de la mascota"

            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha de nacimiento mascota</Label>
            <Input type="text"
              placeholder="Ingrese la fecha de nacimiento de la mascota"
            />
          </FormGroup>
          <FormGroup>
            <Label>Nombres y apellidos propietario</Label>
            <Input
             type="text"
              placeholder="Ingrese nombres y apellidos del propietario"

            />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono propietario</Label>
            <Input 
            type="text"
              placeholder="Ingrese el teléfono del propietario"

            />
          </FormGroup>
          <FormGroup>
            <Label>Dirección propietario</Label>
            <Input 
            type="text"
              placeholder="Ingrese la dirección del propietario"

            />
          </FormGroup>
          <FormGroup>
            <Label>Email propietario</Label>
            <Input 
            type="text"
              placeholder="Ingrese el email del propietario"

            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => openModal()}>Cerrar</Button>
          <Button className="btn btn-success ml-2">Guardar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
