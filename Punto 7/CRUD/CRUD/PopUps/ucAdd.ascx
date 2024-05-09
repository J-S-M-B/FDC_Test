<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucAdd.ascx.cs" Inherits="CRUD.PopUps.ucAdd" %>

<div class="fondo">
    <div class="pop-container">
        <h2>Agregar</h2>
        <div>
            <span>Nombre:</span>
            <asp:TextBox runat="server" ID="txtNombre"></asp:TextBox>
        </div>
        <div>
            <span>DepartamentoId:</span>
            <asp:TextBox runat="server" ID="txtDepartamentoId" type="number" inputmode="numeric"></asp:TextBox>
        </div>
        <div>
            <asp:Button runat="server" ID="btnAceptar" Text="Aceptar" OnClick="btnAceptar_Click" />
            <asp:Button runat="server" ID="btnCancelar" Text="Cancelar" OnClick="btnCancelar_Click" />
        </div>
    </div>
</div>