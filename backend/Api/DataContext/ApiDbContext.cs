using Api.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.DataContext
{
    public class ApiDbContext : IdentityDbContext<Usuario>
    {
        public ApiDbContext(DbContextOptions dbContext) : base(dbContext)
        {
            
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
