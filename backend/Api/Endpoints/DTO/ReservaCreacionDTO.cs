using Api.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Endpoints.DTO;

public class ReservaCreacionDTO
{
    public required int ProductoId { get; set; }
    public required string UsuarioId { get; set; }
    public string NombreCliente { get; set; }
}
