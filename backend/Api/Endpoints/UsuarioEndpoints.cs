using Api.Endpoints.DTO;
using Api.Service;
using Carter;
using Microsoft.AspNetCore.Mvc;

namespace Api.Endpoints;

public class UsuarioEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder routes)
    {
        var app = routes.MapGroup("/api/Usuario");


        app.MapGet("/", async (IUsuarioService usuarioService) =>
        {
            var usuarios = await usuarioService.GetUsuarios();

            return Results.Ok(usuarios);

        }).WithTags("Usuario");


        app.MapGet("/{idUsuario}", async (IUsuarioService usuarioService, string idUsuario) =>
        {
            var usuario = await usuarioService.GetUsuario(idUsuario);

            return Results.Ok(usuario);
            //return Results.Ok();

        }).WithTags("Usuario");
        


        app.MapPost("/Registro", async (IUsuarioService usuarioService, [FromBody] UsuarioRegistroDTO usuarioRegistroDTO) =>
        {
            var usuario = await usuarioService.Registro(usuarioRegistroDTO);

            return Results.Created();

        }).WithTags("Usuario");


        app.MapPost("/Login", async (IUsuarioService usuarioService, [FromBody] UsuarioLoginDTO usuarioLoginDTO) =>
        {
            var usuario = await usuarioService.Login(usuarioLoginDTO);

            return Results.Ok(usuario);

        }).WithTags("Usuario");

        app.MapPost("/Role", (IUsuarioService usuarioService, string roleName) =>
        {
            usuarioService.CreateRole(roleName);

            return Results.Created();
        }).WithTags("Usuario");

        app.MapPost("/User/{userId:Guid}/AddRole/{roleId:Guid}", (IUsuarioService usuarioService, Guid userId, Guid roleId) =>
        {

            usuarioService.AddRoleToUser(roleId.ToString(), userId.ToString());

            return Results.Ok("Rol asociado");
        }).WithTags("Usuario");

        app.MapGet("/RolesWithUsuarios", async (IUsuarioService usuarioService) =>
        {
            var roles = await usuarioService.GetRoles();

            return Results.Ok(roles);
            //return Results.Ok();

        }).WithTags("Usuario");
        
        app.MapGet("/UsuariosWithRoles", async (IUsuarioService usuarioService) =>
        {
            var usuarios = await usuarioService.GetUsersWithRoles();

            return Results.Ok(usuarios);
            //return Results.Ok();

        }).WithTags("Usuario");
    }
}
