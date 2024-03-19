using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Api.Service;
using Carter;
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
        }).WithTags("Reserva");


        app.MapGet("/{idReserva:int}", async (IReservaService reservaService, int idReserva) =>
        {
            var reserva = await reservaService.GetReservaById(idReserva);

            return Results.Ok(reserva);
        }).WithTags("Reserva");

        app.MapPost("/", (IReservaService reservaService, string barrio, [FromBody] ReservaCreacionDTO reservaCreacionDTO) => {
            reservaService.CreateReserva(reservaCreacionDTO, barrio);

            return Results.Created();
        }).WithTags("Reserva");

        app.MapPatch("/{idReserva:int}", async (IReservaService reservaService, int idReserva, EstadoReserva estado) => {
            var reservaDTO = await reservaService.UpdateEstadoReserva(idReserva, estado);

            return Results.Ok(reservaDTO);
        }).WithTags("Reserva");

        app.MapDelete("/{idReserva:int}", (IReservaService reservaService, int idReserva) =>
        {
            reservaService.DeleteReserva(idReserva);

            return Results.NoContent();
        }).WithTags("Reserva");

    }
}
