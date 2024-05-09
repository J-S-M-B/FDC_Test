<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucPUT.ascx.cs" Inherits="CRUD.PopUps.ucPUT" %>
<div class="fondo">
    <div class="pop-container">
        <h2>Actualizar</h2>
        <div>
            <span>Id:</span>
            <asp:TextBox runat="server" ID="txtId" type="number" inputmode="numeric"></asp:TextBox>
        </div>
            <div>
            <span>Nombre:</span>
            <asp:TextBox runat="server" ID="txtNombre"></asp:TextBox>
        </div>
        <div>
            <span>DepartamentoId:</span>
            <asp:TextBox runat="server" ID="txtDepartamentoId" type="number" inputmode="numeric"></asp:TextBox>
        </div>
        <div>
            <asp:Button runat="server" ID="PbtnAceptar" Text="Aceptar" OnClick="PbtnAceptar_Click" />
            <asp:Button runat="server" ID="PbtnCancelar" Text="Cancelar" OnClick="PbtnCancelar_Click"/>
        </div>
    </div>
</div>