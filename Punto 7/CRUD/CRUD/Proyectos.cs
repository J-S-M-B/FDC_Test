//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CRUD
{
    using System;
    using System.Collections.Generic;
    
    public partial class Proyectos
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> ResponsableId { get; set; }
    
        public virtual Empleados Empleados { get; set; }
    }
}
