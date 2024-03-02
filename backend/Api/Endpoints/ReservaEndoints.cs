using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Carter;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;

namespace Api.Endpoints;

public class ReservaEndoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder routes)
    {
        var app = routes.MapGroup("/api/Reserva");

        app.MapPost("/", async (ApiDbContext context, ReservaCreacionDTO reservaCreacionDTO, int idUsuario) => {
            var producto = await context.Productos.FirstOrDefaultAsync(p => p.Id == reservaCreacionDTO.IdProducto);

            if (producto is null)
                return Results.BadRequest($"El producto con Id {reservaCreacionDTO.IdProducto} no existe");

            var usuario = await context.Usuarios.FirstOrDefaultAsync(u => u.Id == idUsuario);

            if (usuario is null)
                return Results.BadRequest($"El usuario con Id {idUsuario} no existe");

            if (await NegarReserva(context, usuario))
            {
                return Results.BadRequest($"El usuario con Id {idUsuario} y nombre {usuario.NombreUsuario} posee el maximo de 3 reservas ingresadas");
            }
            var Reserva = new Reserva()
            {
                Producto = producto,
                Usuario = usuario,
                NombreCliente = reservaCreacionDTO.NombreCliente
            };

            producto.Estado = EstadoProducto.Reservado;

            await context.Reservas.AddAsync(Reserva);

            await context.SaveChangesAsync();

            return Results.Created();
        });

        app.MapPatch("/{idReserva:int}", async (ApiDbContext context, int idReserva, EstadoReserva estado) => {
            var reserva = await context.Reservas.FirstOrDefaultAsync(r => r.Id == idReserva);

            if (reserva is null)
                return Results.BadRequest($"La reserva con Id {idReserva} no existe");

            if (reserva.Estado is EstadoReserva.Ingresada)
                switch (estado)
                {
                    case EstadoReserva.Aprobada:
                        reserva.Estado = EstadoReserva.Aprobada;
                        reserva.Producto.Estado = EstadoProducto.Vendido;
                        break;
                    case EstadoReserva.Cancelada:
                        reserva.Estado = EstadoReserva.Cancelada;
                        reserva.Producto.Estado = EstadoProducto.Disponible;
                        break;
                    default:
                        break;
                };

            await context.SaveChangesAsync();

            return Results.Ok();
        });

        async Task<bool> NegarReserva(ApiDbContext context, Usuario usuario)
        {
            var reservas = await context.Reservas.Where(r => r.Usuario.Id == usuario.Id && r.Estado == EstadoReserva.Ingresada).ToListAsync();
            if (reservas.Count == 3)
            {
                return true;
            }
            return false;
        }

        async void AprobacionAutomatica(ApiDbContext context) {
            var reservas = await context.Reservas.Include(r => r.Producto).ToListAsync();

            var isUnique = reservas.SingleOrDefault(r => r.Producto.Barrio == "X");

            foreach (var reserva in reservas)
            {
                bool result = ((reserva.Producto.Barrio is "X" && reserva.Producto.Precio < 100000) ||
                               (isUnique is not null) && reserva.Producto.Estado == EstadoProducto.Disponible));
                if (result)
                {
                    reserva.Estado = EstadoReserva.Aprobada;
                }
            }
            await context.SaveChangesAsync();
        }
    }
}
