using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUD
{
    public class LEmpleados
    {
        FDC_TestEntities model = new FDC_TestEntities();
        public List<Empleados> GetEmpleados
        {
            get
            {
                return model.Empleados.ToList();
            }
        }

        public void Crear(string nombre, int departamentoId)
        {
            if (string.IsNullOrEmpty(nombre))
            {
                throw new ArgumentException("Ingrese el nombre: ");
            }

            Empleados empleado = new Empleados()
            {
                Nombre = nombre,
                DepartamentoId = departamentoId
            };
            model.Empleados.Add(empleado);
            model.SaveChanges();
        }

        public void Actualizar(int id, string nombre, int departamentoId)
        {
            var empleado = model.Empleados.Find(id);

            if (empleado == null)
            {
                throw new ArgumentException("El empleado con el ID especificado no existe.");
            }

            if (string.IsNullOrEmpty(nombre))
            {
                throw new ArgumentException("Ingrese el nombre.");
            }

            empleado.Nombre = nombre;
            empleado.DepartamentoId = departamentoId;

            model.SaveChanges();
        }

        public void Borrar(int Id)
        {
            var empleado = model.Empleados.Find(Id);

            if (empleado == null)
            {
                throw new ArgumentException("El empleado con el ID especificado no existe.");
            }

            model.Empleados.Remove(empleado);
            model.SaveChanges();
        }



    }
}