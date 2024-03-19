using System.ComponentModel.DataAnnotations;

namespace Api.Endpoints.DTO;

public class UsuarioLoginDTO
{
    [Required(ErrorMessage = "El email es obligatorio")]
    public string Email { get; set; }
    [Required(ErrorMessage = "La contraseña es obligatoria")]
    public string Password { get; set; }
}
