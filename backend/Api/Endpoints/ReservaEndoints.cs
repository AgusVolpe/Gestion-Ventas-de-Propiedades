using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Api.Service;
using Carter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Endpoints;

public class ReservaEndoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder routes)
    {
        var app = routes.MapGroup("/api/Reserva");

        app.MapGet("/", async (IReservaService reservaService) =>
        {
            var reservas = await reservaService.GetAllReservas();

            return Results.Ok(reservas);
        }).WithTags("Reserva")
          .RequireAuthorization(new AuthorizeAttribute { Roles = "Admin, Vendedor, Comercial" });


        app.MapGet("/{idReserva:int}", async (IReservaService reservaService, int idReserva) =>
        {
            var reserva = await reservaService.GetReservaById(idReserva);

            return Results.Ok(reserva);
        }).WithTags("Reserva")
          .RequireAuthorization(new AuthorizeAttribute { Roles = "Admin, Vendedor, Comercial" });


        app.MapPost("/", (IReservaService reservaService, [FromQuery] string barrio, [FromBody] ReservaCreacionDTO reservaCreacionDTO) => {
            reservaService.CreateReserva(reservaCreacionDTO, barrio);

            return Results.Created();
        }).WithTags("Reserva")
          .RequireAuthorization(new AuthorizeAttribute { Roles = "Vendedor" });


        app.MapPatch("/{idReserva:int}", async (IReservaService reservaService, int idReserva, [FromQuery] EstadoReserva estado) =>
        {
            var reservaDTO = await reservaService.UpdateEstadoReserva(idReserva, estado);

            return Results.Ok(reservaDTO);
        }).WithTags("Reserva");
          //.RequireAuthorization(new AuthorizeAttribute { Roles = "Vendedor, Comercial" });


        app.MapDelete("/{idReserva:int}", (IReservaService reservaService, int idReserva) =>
        {
            reservaService.DeleteReserva(idReserva);

            return Results.NoContent();
        }).WithTags("Reserva")
          .RequireAuthorization(new AuthorizeAttribute { Roles = "Vendedor" });


        app.MapGet("/NegarReserva/{idUsuario}", async (IReservaService reservaService, string idUsuario) =>
        {
            var resultado = await reservaService.NegarReserva(idUsuario);

            return Results.Ok(resultado);
        }).WithTags("Reserva")
          .RequireAuthorization(new AuthorizeAttribute { Roles = "Vendedor" });
    }
}
