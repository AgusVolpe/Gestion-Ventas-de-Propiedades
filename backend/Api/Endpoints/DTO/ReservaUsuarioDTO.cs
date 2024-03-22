using Api.Domain;

namespace Api.Endpoints.DTO;

public class ReservaUsuarioDTO
{
    public int Id { get; set; }
    public ProductoDTO Producto { get; set; }
    public string NombreCliente { get; set; }
    public EstadoReserva Estado { get; set; }
}
