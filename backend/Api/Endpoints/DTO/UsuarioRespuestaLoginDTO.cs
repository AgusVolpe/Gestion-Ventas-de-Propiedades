namespace Api.Endpoints.DTO;

public class UsuarioRespuestaLoginDTO
{
    public UsuarioDTO Usuario { get; set; } = null!;
    public string Token { get; set; } = string.Empty;
}
