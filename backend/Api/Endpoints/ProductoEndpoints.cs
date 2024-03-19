using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Api.Service;
using Api.Utilities;
using Carter;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Threading;

namespace Api.Endpoints;

public class ProductoEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder routes)
    {
        var app = routes.MapGroup("/api/Producto");

        app.MapGet("/", async (IProductoService productoService) =>
        {
            var productos = await productoService.GetAllProductos();

            return Results.Ok(productos);
        }).WithTags("Producto");


        app.MapGet("/{idProducto:int}", async (IProductoService productoService, int idProducto) =>
        {
            var producto = await productoService.GetProductoById(idProducto);

            return Results.Ok(producto);
        }).WithTags("Producto");


        app.MapPost("/", (IProductoService productoService, [FromBody] ProductoCreacionDTO productoCreacionDTO) =>
        {
            productoService.CreateProducto(productoCreacionDTO);

            return Results.Created();
        }).WithTags("Producto");


        app.MapPut("/{idProducto:int}", async (IProductoService productoService, int idProducto, [FromBody] ProductoCreacionDTO productoCreacionDTO) =>
        {
            var productoDTO = await productoService.UpdateProducto(idProducto, productoCreacionDTO);

            return Results.Ok(productoDTO);
        }).WithTags("Producto");


        app.MapDelete("/{idProducto:int}", (IProductoService productoService, int idProducto) =>
        {
            productoService.DeleteProducto(idProducto);

            return Results.NoContent();
        }).WithTags("Producto");
    }
}
