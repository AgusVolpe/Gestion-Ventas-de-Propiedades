using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain;

[Table("Producto")]
public class Producto
{
    [Key]
    public int Id { get; set;}
    public string Codigo { get; set;}
    public string Barrio { get; set;}
    public decimal Precio { get; set;}
    public string UrlImagen { get; set;}
    public EstadoProducto Estado { get; set; } = 0;
    public HashSet<Reserva> Reservas { get; set; } = [];
}
public enum EstadoProducto
{
    Disponible,
    Reservado,
    Vendido
}
