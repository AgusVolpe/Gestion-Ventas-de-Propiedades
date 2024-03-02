using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain;

[Table("Usuario")]
public class Usuario
{
    public int Id { get; set; }
    public required string NombreUsuario { get; set; }
    public required string Password { get; set; }
}
