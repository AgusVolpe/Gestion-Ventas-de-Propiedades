namespace Api.Endpoints.DTO;

public class UsuarioDTO
{
    public string Id { get; set; }
    public string Email { get; set; }
    public HashSet<ReservaDTO> Reservas { get; set; } = [];
}
