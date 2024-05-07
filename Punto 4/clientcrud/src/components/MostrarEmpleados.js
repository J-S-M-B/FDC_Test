import axios from "axios";
import React, { useEffect, useState } from 'react';
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";
import { mostrar_alerta } from "../functions";

const MostrarEmpleados = () => {

  const headers = {
    "Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"
  };
  const url1 = 'http://localhost:4000/empleados';
  const [empleados, setEmpleados] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [nombreDepartamento, setNombreDepartamento] = useState('');
  const [responsableId, setResponsableId] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async () => {
    const res = await axios.get(url1, { headers });
    setEmpleados(res.data);
  }

  const openModal = (op, id, nombre, departamentoId, responsableId) => {
    setId('');
    setNombre('');
    setDepartamentoId('');
    setNombreDepartamento('');
    setResponsableId('');
    setNombreProyecto('');
    setOperation(op);
    if (op === 1) {
      setTitle('Registrar empleado');
    }
    else if (op === 2) {
      setTitle('Editar empleado');
      setId(id);
      setNombre(nombre);
      setDepartamentoId(departamentoId);
      setResponsableId(responsableId);
    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  const validar = () => {
    var parametros;
    var metodo;
    if (nombre.trim() === '') {
      mostrar_alerta('Digite nombre del empleado', 'warning');
    }
    else if (departamentoId.trim() === '') {
      mostrar_alerta('Digite id del departamento', 'warning');
    }
    else if (responsableId.trim() === '') {
      mostrar_alerta('Digite id del proyecto', 'warning');
    }
    else {
      if (operation === 1) {
        parametros = { nombre: nombre.trim(), departamentoId: departamentoId.trim(), responsableId: responsableId.trim() };
        metodo = 'POST';
      }
      else {
        parametros = { id: id, nombre: nombre.trim(), departamentoId: departamentoId.trim(), responsableId: responsableId.trim() };
        metodo = 'PUT';
      }
      enviar(metodo, parametros);
    }
  }
  const enviar = async (metodo, parametros) => {
    await axios({ method: metodo, url1: url1, data: parametros }).then(function (respuesta) {
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      mostrar_alerta(msj, tipo);
      if (tipo === 'success') {
        document.getElementById('btnCerrar').click();
        getEmpleados()
      }
    })
      .catch(function (error) {
        mostrar_alerta('Error en la solicitud', 'error');
      });
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
                    <th>Nombre del departamento</th>
                    <th>Responsable Id</th>
                    <th>Nombre del Proyecto</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((empleado) => (
                    <tr key={empleado.Id}>
                      <td>{empleado.Id}</td>
                      <td>{empleado.Nombre}</td>
                      <td>{empleado.DepartamentoId}</td>
                      <td>{empleado.NombreDepartamento}</td>
                      <td>{empleado.ResponsableId}</td>
                      <td>{empleado.NombreProyecto}</td>
                      <td>
                        <button onClick={() => openModal(2, empleado.Id, empleado.Nombre, empleado.DepartamentoId, empleado.ResponsableId)}
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
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-houses"></i></span>
                <input type="text" id="responsableid" className="form-control" placeholder="Responsableid" value={responsableId}
                  onChange={(e) => setResponsableId(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="bi bi-floppy"></i> Guardar
                </button>
              </div>
              <div className="modal-footer">
                <button type='button' id='btnCerrar' className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostrarEmpleados
