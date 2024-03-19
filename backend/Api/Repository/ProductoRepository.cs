using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Api.Utilities;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository;

public interface IProductoRepository
{
    Task<List<Producto>> GetProductos();
    Task<Producto> GetProducto(int idProducto);
    void AddProducto(ProductoCreacionDTO productoCreacionDTO);
    Task<Producto> UpdateProducto(int idProducto, ProductoCreacionDTO productoCreacionDTO);
    void RemoveProducto(int idProducto);
}

public class ProductoRepository(ApiDbContext context) : IProductoRepository
{
    public async void AddProducto(ProductoCreacionDTO productoCreacionDTO)
    {
        try
        {
            Producto producto = new Producto
            {
                Codigo = productoCreacionDTO.Codigo,
                Barrio = productoCreacionDTO.Barrio,
                Precio = productoCreacionDTO.Precio,
                UrlImagen = productoCreacionDTO.UrlImagen
            };

            context.Productos.Add(producto);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Se produjo un error al crear producto", ex);
        }
    }

    public async Task<Producto> GetProducto(int idProducto)
    {
        var producto = await context.Productos.FirstOrDefaultAsync(p => p.Id == idProducto);

        return producto;
    }

    public async Task<List<Producto>> GetProductos()
    {
        var productos = await context.Productos.ToListAsync();

        return productos;
    }

    public async void RemoveProducto(int idProducto)
    {
        try
        {
            var producto = await context.Productos.FirstOrDefaultAsync(p => p.Id == idProducto);
            if (producto is null)
                throw new Exception($"El producto con Id {idProducto} no existe");

            context.Productos.Remove(producto);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Se produjo un error al eliminar el producto", ex);
        }
    }

    public async Task<Producto> UpdateProducto(int idProducto, ProductoCreacionDTO productoCreacionDTO)
    {
        try
        {
            var producto = await context.Productos.FirstOrDefaultAsync(p => p.Id == idProducto);

            if (producto is null)
                throw new Exception($"El producto con Id {idProducto} no existe");

            producto.Codigo = productoCreacionDTO.Codigo;
            producto.Barrio = productoCreacionDTO.Barrio;
            producto.Precio = productoCreacionDTO.Precio;
            producto.UrlImagen = productoCreacionDTO.UrlImagen;

            await context.SaveChangesAsync();

            return producto;
        }
        catch (Exception ex)
        {
            throw new Exception("Se produjo un error al actualizar el estado del producto", ex);
        }
    }
}
