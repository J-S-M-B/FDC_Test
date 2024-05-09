using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CRUD.PopUps
{
    public partial class ucDELETE : System.Web.UI.UserControl
    {
        LEmpleados clase = new LEmpleados();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void DbtnAceptar_Click(object sender, EventArgs e)
        {
            int Id;
            if (int.TryParse(txtId.Text, out Id))
            {
                clase.Borrar(Id);
                Response.Redirect(Request.RawUrl);
                this.Visible = false;

            }
        }

        protected void DbtnCancelar_Click(object sender, EventArgs e)
        {
            this.Visible = false;   
        }
    }
}