using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain;

[Table("Reserva")]
public class Reserva
{
    [Key]
    public int Id { get; set;}
    public int ProductoId { get; set;}
    public required Producto Producto { get; set; } = null!;
    public string UsuarioId { get; set;}
    public required Usuario Usuario { get; set; } = null!;
    public required string NombreCliente { get; set;}
    public EstadoReserva Estado { get; set; } = 0;
}
public enum EstadoReserva
{
    Ingresada,
    Cancelada,
    Aprobada,
    Rechazada
}
