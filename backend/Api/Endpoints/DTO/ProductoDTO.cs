using Api.Domain;

namespace Api.Endpoints.DTO;

//public class ProductoDTO
//{
//    public int Id { get; set; }
//    public string Codigo { get; set; }
//    public string Barrio { get; set; }
//    public decimal Precio { get; set; }
//    public string UrlImagen { get; set; }
//    public EstadoProducto Estado { get; set; }
//}

public record ProductoDTO(int Id, string Codigo, string Barrio, decimal Precio, string? UrlImagen, EstadoProducto Estado);
