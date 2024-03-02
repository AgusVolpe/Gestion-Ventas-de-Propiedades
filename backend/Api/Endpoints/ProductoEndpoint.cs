using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Api.Utilities;
using Carter;
using System.Runtime.CompilerServices;
using System.Threading;

namespace Api.Endpoints;

public class ProductoEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder routes)
    {
        var app = routes.MapGroup("/api/Producto");

        app.MapGet("/", (ApiDbContext context) =>
        {
            var productos = context.Productos.Select(p => p.ConvertToProductoDto());

            return Results.Ok(productos);

        }).WithTags("Producto");

        app.MapGet("/{idProducto:int}", (ApiDbContext context, int idProducto) =>
        {
            var productos = context.Productos.Where(p => p.Id == idProducto)
                .Select(p => p.ConvertToProductoDto());

            return Results.Ok(productos);
        }).WithTags("Producto");

        app.MapPost("/", (ApiDbContext context, ProductoCreacionDTO productoCreacionDTO) =>
        {
            Producto producto = new Producto
            {
                Codigo = productoCreacionDTO.Codigo,
                Barrio = productoCreacionDTO.Barrio,
                Precio = productoCreacionDTO.Precio,
                UrlImagen = productoCreacionDTO.UrlImagen
            };

            context.Productos.Add(producto);

            context.SaveChanges();

            return Results.Created();
        }).WithTags("Producto");

        app.MapPut("/{idProducto:int}", (ApiDbContext context, int idProducto, ProductoCreacionDTO productoCreacionDTO) =>
        {
            var producto = context.Productos.FirstOrDefault(p => p.Id == idProducto);

            if (producto is null)
                return Results.BadRequest();

            producto.Codigo = productoCreacionDTO.Codigo;
            producto.Barrio = productoCreacionDTO.Barrio;
            producto.Precio = productoCreacionDTO.Precio;
            producto.UrlImagen = productoCreacionDTO.UrlImagen;

            context.SaveChanges();

            return Results.Ok();
        }).WithTags("Producto");

        app.MapDelete("/{idProducto:int}", (ApiDbContext context, int idProducto) =>
        {
            var producto = context.Productos.FirstOrDefault(p => p.Id == idProducto);

            if (producto is null)
                return Results.BadRequest();

            context.Productos.Remove(producto);

            context.SaveChanges();

            return Results.NoContent();
        }).WithTags("Producto");
    }
}
