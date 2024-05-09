using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CRUD.PopUps
{
    public partial class ucPUT : System.Web.UI.UserControl
    {
        LEmpleados clase = new LEmpleados();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void PbtnAceptar_Click(object sender, EventArgs e)
        {
            int Id;
            int departamentoId;
            if (int.TryParse(txtId.Text, out Id))
            
            if (int.TryParse(txtDepartamentoId.Text, out departamentoId))
                
            clase.Actualizar(Id, txtNombre.Text, departamentoId);
            Response.Redirect(Request.RawUrl);
            this.Visible = false;
                
        }

        

        protected void PbtnCancelar_Click(object sender, EventArgs e)
        {
            this.Visible = false;

        }
    }
}