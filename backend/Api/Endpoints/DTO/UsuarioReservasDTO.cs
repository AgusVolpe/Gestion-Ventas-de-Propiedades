namespace Api.Endpoints.DTO;

public class UsuarioReservasDTO
{
    public string Id { get; set; }
    public string Email { get; set; }
    public HashSet<ReservaUsuarioDTO> Reservas { get; set; } = [];
}
