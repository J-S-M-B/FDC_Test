<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucDELETE.ascx.cs" Inherits="CRUD.PopUps.ucDELETE" %>
<div class="fondo">
    <div class="pop-container">
        <h2>Eliminar</h2>
        <div>
            <span>Id:</span>
            <asp:TextBox runat="server" ID="txtId" type="number" inputmode="numeric"></asp:TextBox>
        </div>
        <div>
            <asp:Button runat="server" ID="DbtnAceptar" Text="Aceptar" OnClick="DbtnAceptar_Click" />
            <asp:Button runat="server" ID="DbtnCancelar" Text="Cancelar" OnClick="DbtnCancelar_Click" />
        </div>
    </div>
</div>