import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Text, View } from 'react-native';

interface Empleado {
  id: number;
  nombre: string;
  departamentoId: number;
  nombreDepartamento: string;
  responsableId: number;
  nombreProyecto: string;
}

const MostrarEmpleados = () => {

  const [data, setData] = useState<Empleado[]>([]);
  const [data1, setData1] = useState();
  const [empleados, setEmpleados] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async () => {
    try {
      const res = await fetch('http://localhost:4000/empleados', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      setData1(data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  }

  const createEmpleado = async () => {
    try {
      const res = await axios.post('http://localhost:4000/empleados', {
        nombre: nombre,
        departamentoId: departamentoId,
        nombreProyecto: nombreProyecto
      });
      Alert.alert('Registro creado');
      getEmpleados();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error en la solicitud');
    }
  }

  const updateEmpleado = async (id: number) => {
    try {
      const res = await axios.put(`http://localhost:4000/empleados/${id}`, {
        nombre: nombre,
        departamentoId: departamentoId,
        nombreProyecto: nombreProyecto
      });
      Alert.alert('Registro actualizado');
      getEmpleados();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error en la solicitud');
    }
  }

  const deleteEmpleado = async (id: number) => {
    Alert.alert(
      '¿Seguro que desea eliminar al empleado?',
      'El cambio es irreversible',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await axios.delete(`http://localhost:4000/empleados/${id}`);
              Alert.alert('Registro eliminado');
              getEmpleados();
            } catch (error) {
              console.error('Error en la solicitud:', error);
              Alert.alert('Error en la solicitud');
            }
          }
        }
      ]
    );
  }

  const handleEmpleadoAction = async (op: number, id: number) => {
    if (op === 1) {
      await createEmpleado();
    } else if (op === 2) {
      await updateEmpleado(id);
    } else if (op === 3) {
      await deleteEmpleado(id);
    }
    clearForm();
  }

  const clearForm = () => {
    setId('');
    setNombre('');
    setDepartamentoId('');
    setNombreProyecto('');
  }

  return (
    <View>
      <Text>Empleados</Text>
      <Button title="Añadir" onPress={() => handleEmpleadoAction(1, 0)} />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.nombre}</Text>
            <Text>{item.departamentoId}</Text>
            <Text>{item.nombreDepartamento}</Text>
            <Text>{item.responsableId}</Text>
            <Text>{item.nombreProyecto}</Text>
            <Button title="Editar" onPress={() => handleEmpleadoAction(2, item.id)} />
            <Button title="Eliminar" onPress={() => handleEmpleadoAction(3, item.id)} />
          </View>
        )}

      />
    </View>
  );
}

export default MostrarEmpleados;
