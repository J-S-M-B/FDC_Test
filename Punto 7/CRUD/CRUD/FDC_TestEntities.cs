using System.Data.Entity;

namespace CRUD
{
    public class FDC_TestEntities : DbContext
    {
        public DbSet<Empleados> Empleados { get; set; }
        public DbSet<Proyectos> Proyectos { get; set; }
    }
}
