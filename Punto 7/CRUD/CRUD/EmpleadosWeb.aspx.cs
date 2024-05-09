using CRUD.PopUps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CRUD
{
    public partial class EmpleadosWeb : System.Web.UI.Page
    {
        LEmpleados clase = new LEmpleados();
        protected void Page_Load(object sender, EventArgs e)
        {
            rptEmpleados.DataSource = clase.GetEmpleados;
            rptEmpleados.DataBind();
        }

        protected void btnAgregar_Click(object sender, EventArgs e)
        {
            ucAdd.Visible = true;
        }

        protected void btnEliminar_Click(object sender, EventArgs e)
        {
            ucDELETE.Visible = true;
        }

        protected void btnActualizar_Click(object sender, EventArgs e)
        {
            ucPUT.Visible = true;
        }
    }
}