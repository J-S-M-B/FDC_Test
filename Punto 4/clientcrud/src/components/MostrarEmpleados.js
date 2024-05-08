import axios from "axios";
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { mostrar_alerta } from "../functions";

const MostrarEmpleados = () => {

  const headers = {
    "Accept": "application/json, text/plain, /",
    "Content-Type": "multipart/form-data"
  };
  const url = 'http://localhost:4000/empleados';
  const [empleados, setEmpleados] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [title, setTitle] = useState('');
  const [modal, setModal] = useState('');
  
  useEffect(() => {
    getEmpleados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getEmpleados = async () => {
    try {
      const res = await axios.get(url, { headers });
      setEmpleados(res.data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  }
  
  const createEmpleado = async ( data ) => {   

    try {
      const res = await axios.post(  
        url, 
        data, 
        headers);

      mostrar_alerta('Registro creado', 'info')  
      getEmpleados();
      return res.data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      mostrar_alerta('Error en la solicitud', 'error');
      throw error; 
    }
  }

  const updateEmpleado = async ( id, data ) => {
    var url2 = `http://localhost:4000/empleados/${id}`;
    try {
      const res = await axios.put(  
        url2, 
        data, 
        headers);

      mostrar_alerta('Registro actualizado', 'info')
      getEmpleados();
      return res.data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      mostrar_alerta('Error en la solicitud', 'error');
      throw error; 
    }
  }
  
  const deleteEmpleado = async ( id ) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title:'¿Seguro que desea eliminar al empleado?',
      icon: 'question', text: 'El cambio es irreversible',
      showCancelButton: true, confirmButtonText:'Confirmar', cancelButtonText:'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed){
        var url2 = `http://localhost:4000/empleados/${id}`;
        try {
          const res = await axios.delete(  
        url2, 
        id,
        headers);
        mostrar_alerta('Registro eliminado', 'info')
        getEmpleados();
        return res.data;
      } catch (error) {
        console.error('Error en la solicitud:', error);
        mostrar_alerta('Error en la solicitud', 'error');
        throw error; 
      }
      
    } else {
        mostrar_alerta('El registro no fue eliminado', 'info')
    }
    });
  }
  
  const handleEmpleadoAction = async (op, ID) => {
    var data = { Nombre: nombre, DepartamentoId: departamentoId, NombreProyecto: nombreProyecto };
    
    if (op === 1) {
      await createEmpleado(data);
    } if (op === 2) {
      await updateEmpleado(id, data);
    } else if (op === 3) {
      await deleteEmpleado(ID)
    }

      document.getElementById('btnCerrar').click();
      clearForm();
  }

  const clearForm = () => {
    setId('');
    setNombre('');
    setDepartamentoId('');
    setNombreProyecto('');
  }
  
  const openModal = (op, id, nombre, departamentoId, nombreProyecto) => {
    if (op === 1) {
      setTitle('Registrar empleado');
      setModal(1);
      
    } else if (op === 2) {
      setTitle('Editar empleado');
      setId(id);
      setNombre(nombre);
      setDepartamentoId(departamentoId);
      setNombreProyecto(nombreProyecto);
      setModal(2);
    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmpleados'>
                <i className='bi bi-plus-circle'></i> Añadir
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
                    <th></th> 
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
                        <button onClick={() => openModal(2, empleado.Id, empleado.Nombre, empleado.DepartamentoId, empleado.NombreProyecto) }
                          className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalEmpleados">
                          <i className="bi bi-pen"></i> Editar
                        </button>
                        &nbsp;
                        <button onClick={() => handleEmpleadoAction(3, empleado.Id)} className="btn btn-danger">
                          <i className="bi bi-trash"></i> Eliminar
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
                <span className="input-group-text"><i className="bi bi-card-text"></i></span>
                <input type="text" id="nombreProyecto" className="form-control" placeholder="Nombre del Proyecto" value={nombreProyecto}
                  onChange={(e) => setNombreProyecto(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => handleEmpleadoAction(modal)} className="btn btn-success">
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
export default MostrarEmpleados;