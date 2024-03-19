using Api.Domain;
using Api.Endpoints.DTO;
using Api.Repository;
using Api.Utilities;
using Mapster;

namespace Api.Service;

public interface IProductoService
{
    Task<List<ProductoDTO>> GetAllProductos();
    Task<ProductoDTO> GetProductoById(int idProducto);
    void CreateProducto(ProductoCreacionDTO productoCreacionDTO);
    Task<ProductoDTO> UpdateProducto(int idProducto, ProductoCreacionDTO productoCreacionDTO);
    void DeleteProducto(int idProducto);
}

public class ProductoService(IProductoRepository productoRepository) : IProductoService
{
    public void CreateProducto(ProductoCreacionDTO productoCreacionDTO)
    {
        productoRepository.AddProducto(productoCreacionDTO);
    }

    public async Task<ProductoDTO> GetProductoById(int idProducto)
    {
        var producto = await productoRepository.GetProducto(idProducto);
        var productoDTO = producto.Adapt<ProductoDTO>();
        return productoDTO;
    }

    public async Task<List<ProductoDTO>> GetAllProductos()
    {
        var productos = await productoRepository.GetProductos();
        var productosDTO = productos.Adapt<List<ProductoDTO>>();
        return productosDTO;
    }

    public void DeleteProducto(int idProducto)
    {
        productoRepository.RemoveProducto(idProducto);
    }

    public async Task<ProductoDTO> UpdateProducto(int idProducto, ProductoCreacionDTO productoCreacionDTO)
    {
        var producto = productoRepository.UpdateProducto(idProducto, productoCreacionDTO);
        var productoDTO = producto.Result.Adapt<ProductoDTO>();
        return productoDTO;
    }
}
