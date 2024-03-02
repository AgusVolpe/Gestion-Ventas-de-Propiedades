using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain;

[Table("Reserva")]
public class Reserva
{
    public int Id { get; set;}
    [ForeignKey("Id")]
    public required Producto Producto { get; set;}
    [ForeignKey("Id")]
    public required Usuario Usuario { get; set; }
    public required string NombreCliente { get; set;}
    public EstadoReserva Estado { get; set; } = 0;
}
public enum EstadoReserva
{
    Ingresada,
    Cancelada,
    Aprobada,
    Rechazada,
    Finalizada
}
