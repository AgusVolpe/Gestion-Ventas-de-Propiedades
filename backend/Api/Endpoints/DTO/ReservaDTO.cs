using Api.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Endpoints.DTO;

public class ReservaDTO
{
    public int Id { get; set; }
    public ProductoDTO Producto { get; set; }
    public UsuarioDTO Usuario { get; set; }
    public string NombreCliente { get; set; }
    public EstadoReserva Estado { get; set; }
}