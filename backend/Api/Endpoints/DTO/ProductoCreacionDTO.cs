using Api.Domain;

namespace Api.Endpoints.DTO;

public class ProductoCreacionDTO
{
    public string Codigo { get; set; }
    public string Barrio { get; set; }
    public decimal Precio { get; set; }
    public string? UrlImagen { get; set; }
}

//public record ProductoCreacionDTO(string Codigo, string Barrio, decimal Precio, string? UrlImagen);
