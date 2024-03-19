using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain;

[Table("Usuario")]
public class Usuario : IdentityUser
{
    public HashSet<Reserva> Reservas { get; set; } = [];
}
