namespace Api.Endpoints.DTO;

public class RolesUsuarioDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public List<UsuarioDTO> Usuarios { get; set; } = [];
}
