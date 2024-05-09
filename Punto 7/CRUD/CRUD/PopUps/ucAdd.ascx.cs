using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CRUD.PopUps
{
    public partial class ucAdd : System.Web.UI.UserControl
    {
        LEmpleados clase = new LEmpleados();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnAceptar_Click(object sender, EventArgs e)
        {
            int departamentoId;
            if (int.TryParse(txtDepartamentoId.Text, out departamentoId))
            {
                clase.Crear(txtNombre.Text, departamentoId);
                Response.Redirect(Request.RawUrl);
                this.Visible = false;
            }

        }

        protected void btnCancelar_Click(object sender, EventArgs e)
        {
            this.Visible = false;
        }
    }
}