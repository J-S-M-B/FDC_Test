import axios from "axios";
import React, { useEffect, useState } from 'react';
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";
//import { mostrar_alerta } from "../functions";

const MostrarEmpleados = () => {

  const headers = {
    "Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"
  };
  const url1 = 'http://localhost:4000/empleados';
  const [empleados, setEmpleados] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async () => {
    const res = await axios.get(url1, { headers });
    setEmpleados(res.data);
  }

  const openModal = (op, id, nombre, departamentoId) => {
    setId('');
    setNombre('');
    setDepartamentoId('');
    setOperation(op);
    if(op === 1){
      setTitle('Registrar empleado');
    }
    else if (op === 2){
      setTitle('Editar empleado');
      setId(id);
      setNombre(nombre);
      setDepartamentoId(departamentoId);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmpleados'>
                <i class='bi bi-plus-circle'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <h1>Empleados</h1>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>DepartamentoId</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((empleado) => (
                    <tr key={empleado.Id}>
                      <td>{empleado.Id}</td>
                      <td>{empleado.Nombre}</td>
                      <td>{empleado.DepartamentoId}</td>
                      <td>
                        <button onClick={() => openModal(2,empleado.Id,empleado.Nombre,empleado.DepartamentoId)} 
                        className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalEmpleados">
                          <i className="bi bi-pen"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div id='modalEmpleados' className='modal fade' aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title text-center">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input type='hidden' id='id'></input>
                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="bi bi-person"></i></span>
                  <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="bi bi-houses"></i></span>
                  <input type="text" id="departamentoid" className="form-control" placeholder="DepartamentoId" value={departamentoId}
                  onChange={(e) => setDepartamentoId(e.target.value)}
                  ></input>
                </div>
                <div className="d-grid col-6 mx-auto">
                  <button className="btn btn-success">
                    <i className="bi bi-floppy"></i>
                  </button>
                </div>
                <div className="modal-footer">
                  <button type='button' className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostrarEmpleados
