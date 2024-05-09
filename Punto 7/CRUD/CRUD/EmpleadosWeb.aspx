<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EmpleadosWeb.aspx.cs" Inherits="CRUD.EmpleadosWeb" %>

<%@ Register Src="~/PopUps/ucAdd.ascx" TagPrefix="uc1" TagName="ucAdd" %>
<%@ Register Src="~/PopUps/ucDELETE.ascx" TagPrefix="uc1" TagName="ucDELETE" %>
<%@ Register Src="~/PopUps/ucPUT.ascx" TagPrefix="uc1" TagName="ucPUT" %>




<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1>Empleados</h1>
            <asp:Button runat="server" ID="btnAgregar" Text="Agregar" OnClick="btnAgregar_Click"/>
            <asp:Button runat="server" ID="btnActualizar" Text="Actualizar" OnClick="btnActualizar_Click"/>
            <asp:Button runat="server" ID="btnEliminar" Text="Eliminar" OnClick="btnEliminar_Click"/>
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>DepartamentoId</th>
                        <th>Nombre del departamento</th>
                    </tr>
                </thead>
                <tbody>
                    <asp:Repeater runat="server" ID="rptEmpleados" ItemType="CRUD.Empleados">
                        <ItemTemplate>
                            <tr>
                                <td><%#Container.ItemIndex + 1 %></td>
                                <td><%#Item.Id %></td>
                                <td><%#Item.Nombre %></td>
                                <td><%#Item.DepartamentoId %></td>
                                <td><%#Item.Departamentos.Nombre %></td>
                            </tr>
                        </ItemTemplate>
                    </asp:Repeater>
                </tbody>
            </table>
        </div>
        <uc1:ucAdd runat="server" id="ucAdd" Visible="false"  />
        <uc1:ucDELETE runat="server" id="ucDELETE" Visible="false"/>
        <uc1:ucPUT runat="server" id="ucPUT" Visible="false" />
    </form>
</body>
</html>
