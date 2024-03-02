using Api.Domain;
using Api.Endpoints.DTO;

namespace Api.Utilities;

public static class Mapper
{
    public static ProductoDTO ConvertToProductoDto(this Producto p) =>
        new(p.Id, p.Codigo, p.Barrio, p.Precio, p.UrlImagen, p.Estado);
}
