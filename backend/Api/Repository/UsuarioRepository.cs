using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using System.Data.Common;
using System.Data;
using Mapster;
using System;

namespace Api.Repository;

public interface IUsuarioRepository
{
    Task<List<Usuario>> GetUsuarios();
    Task<Usuario> GetUsuario(string idUsuario);
    Task<List<RolesUsuarioDTO>> GetRoles();
    Task<List<UsuarioRolesDTO>> GetUsersWithRoles();
    Task<bool> IsSingleUser(string userName);
    Task<Usuario> Registro(UsuarioRegistroDTO usuarioRegistroDTO);
    Task<UsuarioRespuestaLoginDTO> Login(UsuarioLoginDTO usuarioLoginDTO);
    string GeneradorToken(Usuario usuario, string roleUsuario, string secretKey);
    void AddRole(string roleName);
    void AddRoleToUser(string roleId, Usuario usuario);
}

public class UsuarioRepository(ApiDbContext context, 
                               RoleManager<IdentityRole> roleManager, 
                               UserManager<Usuario> userManager,
                               IConfiguration config) : IUsuarioRepository
{
    private readonly string claveSecreta = config["JWT:Key"] ?? throw new Exception("No se encontro la clave secreta");
    public async Task<List<Usuario>> GetUsuarios()
    {
        var usuarios = await context.Usuarios.Include(u => u.Reservas).ThenInclude(r => r.Producto).ToListAsync();
        return usuarios;
    }
    
    public async Task<Usuario> GetUsuario(string idUsuario)
    {
        var usuario = await context.Usuarios.Include(u => u.Reservas).ThenInclude(r => r.Producto).FirstOrDefaultAsync(u => u.Id == idUsuario);
        return usuario;
    }

    public async Task<bool> IsSingleUser(string email)
    {
        var validation = await context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
        if (validation is null)
        {
            return true;
        }
        return false;
    }

    public async Task<UsuarioRespuestaLoginDTO> Login(UsuarioLoginDTO usuarioLoginDTO)
    {
        var usuarioEncontrado = await context.Usuarios.FirstOrDefaultAsync(
                                            u => u.NormalizedEmail == usuarioLoginDTO.Email.ToUpper());
        if (usuarioEncontrado is null)
        {
            throw new Exception("Email o contraseña incorrecta");
        }


        bool esValido = await userManager.CheckPasswordAsync(usuarioEncontrado, usuarioLoginDTO.Password);
        if (esValido is false)
        {
            throw new Exception("Email o contraseña incorrecta");
        }

        var roles = await userManager.GetRolesAsync(usuarioEncontrado);
        var roleUser = roles.FirstOrDefault() ?? throw new Exception("No se encontró el rol del usuario");

        string token = GeneradorToken(usuarioEncontrado, roleUser, claveSecreta);

        var usuarioRespuestaLoginDTO = new UsuarioRespuestaLoginDTO()
        {
            Usuario = usuarioEncontrado.Adapt<UsuarioDTO>(),
            Token = token
        };
        return usuarioRespuestaLoginDTO;
    }

    public async Task<Usuario> Registro(UsuarioRegistroDTO usuarioRegistroDTO)
    {
        var existOne = await context.Usuarios.FirstOrDefaultAsync(a => true);
        if (existOne is null)
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
            await roleManager.CreateAsync(new IdentityRole("Vendedor"));
            await roleManager.CreateAsync(new IdentityRole("Comercial"));
        }

        var newUsuario = new Usuario()
        {
            Email = usuarioRegistroDTO.Email,
            NormalizedEmail = usuarioRegistroDTO.Email.ToUpper(),
            UserName = usuarioRegistroDTO.Email
        };


        using (var tansaction = context.Database.BeginTransactionAsync())
        {
            try
            {
                var createResult = await userManager.CreateAsync(newUsuario, usuarioRegistroDTO.Password);
                if (!createResult.Succeeded)
                {
                    throw new Exception("No se pudo crear la cuenta");
                }

                var role = usuarioRegistroDTO.Role;

                await userManager.AddToRoleAsync(newUsuario, role);
                var usuarioReturn = await context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuarioRegistroDTO.Email);
              
                await context.Database.CommitTransactionAsync();

                return usuarioReturn;
            }
            catch (Exception ex)
            {
                await context.Database.RollbackTransactionAsync();
                throw new Exception("Error al registrar un nuevo usuario", ex);
            }
        }
    }

    public string GeneradorToken(Usuario usuario, string roleUsuario, string secretKey)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secretKey);

        var tokenInformation = new SecurityTokenDescriptor
        {
            //Se deben fijar el mismo valor que para ValidAudience y ValidIssuer puestos en program.cs
            //Issuer = builder.Configuration["JWT:Issuer"],
            //Audience = builder.Configuration["JWT:Audience"],

            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Email.ToString()),
                    new Claim(ClaimTypes.Role, roleUsuario)
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenCreated = tokenHandler.CreateToken(tokenInformation);

        return tokenHandler.WriteToken(tokenCreated);
    }

    public async Task<List<RolesUsuarioDTO>> GetRoles()
    {
        var roles = await context.Roles.ToListAsync();

        var result = new List<RolesUsuarioDTO>();

        foreach (var rol in roles)
        {
            var usuarios = await userManager.GetUsersInRoleAsync(rol.Name);
            var usuariosDTO = usuarios.Select(u => new UsuarioDTO { Id = u.Id, Email = u.Email }).ToList();

            result.Add(new RolesUsuarioDTO
            {
                Id = rol.Id,
                Name = rol.Name,
                Usuarios = usuariosDTO
            });
        }

        return result;
    }

    public async Task<List<UsuarioRolesDTO>> GetUsersWithRoles()
    {
        var usuarios = await context.Usuarios.ToListAsync();

        var result = new List<UsuarioRolesDTO>();
        foreach (var usuario in usuarios)
        {
            var rols = new List<RolDTO>();
            var roles = await userManager.GetRolesAsync(usuario);
            foreach (var role in roles)
            {
                var rol = await roleManager.Roles.FirstOrDefaultAsync(r => r.Name == role);
                rols.Add(new RolDTO
                {
                    Id = rol.Id,
                    Name = rol.Name
                });
            }

            result.Add(new UsuarioRolesDTO
            {
                Id = usuario.Id,
                Email = usuario.Email,
                Roles = rols
            });
        }

        return result;
    }

    public async void AddRole(string roleName)
    {
        await roleManager.CreateAsync(new IdentityRole { Name = roleName });
    }

    public async void AddRoleToUser(string roleId, Usuario usuario)
    {
        var rol = await roleManager.FindByIdAsync(roleId);
        if (rol is null)
            throw new Exception("Rol no encontraado");
        await userManager.AddToRoleAsync(usuario,rol.Name);
    }
}
