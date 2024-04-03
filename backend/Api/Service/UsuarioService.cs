using Api.Domain;
using Api.Endpoints.DTO;
using Api.Repository;
using Mapster;
using Microsoft.AspNetCore.Identity;

namespace Api.Service;

public interface IUsuarioService
{
    Task<List<UsuarioReservasDTO>> GetUsuarios();
    Task<UsuarioReservasDTO> GetUsuario(string idUsuario);
    Task<List<RolesUsuarioDTO>> GetRoles();
    Task<List<UsuarioRolesDTO>> GetUsersWithRoles();
    Task<List<UsuarioReporteDTO>> GetReporte();
    Task<UsuarioDTO> Registro(UsuarioRegistroDTO usuarioRegistroDTO);
    Task<string> Login(UsuarioLoginDTO usuarioLoginDTO);
    void CreateRole(string roleName);
    void AddRoleToUser(string roleId, string userId);
}

public class UsuarioService(IUsuarioRepository usuarioRepository) : IUsuarioService
{
    public async void AddRoleToUser(string roleId, string userId)
    {
        var usuario = await usuarioRepository.GetUsuario(userId);
        if (usuario is null)
        {
            throw new Exception("Usuario no encontrado");
        }
        usuarioRepository.AddRoleToUser(roleId,usuario);
    }

    public void CreateRole(string roleName)
    {
        usuarioRepository.AddRole(roleName);
    }

    public async Task<List<UsuarioReporteDTO>> GetReporte()
    {
        var usuarios = await usuarioRepository.GetVendedores();
        var ventas = 0;
        var usuariosReporte = new List<UsuarioReporteDTO>();
        foreach (var usuario in usuarios)
        {
            ventas = 0;
            var reservas = usuarioRepository.GetUsuario(usuario.Id).Result.Reservas.ToList();
            foreach (var reserva in reservas)
            {
                if(reserva.Producto.Estado == EstadoProducto.Vendido)
                {
                    ventas++;
                }
            }
            usuariosReporte.Add(new UsuarioReporteDTO { Name = usuario.Email, Value = ventas });
        }
        return usuariosReporte;
    }

    public Task<List<RolesUsuarioDTO>> GetRoles()
    {
        var roles = usuarioRepository.GetRoles();
        return roles;
    }

    public Task<List<UsuarioRolesDTO>> GetUsersWithRoles()
    {
        var usuarios = usuarioRepository.GetUsersWithRoles();
        return usuarios;
    }

    public async Task<UsuarioReservasDTO> GetUsuario(string idUsuario)
    {
        var usuario = await usuarioRepository.GetUsuario(idUsuario);
        var usuarioDTO = usuario.Adapt<UsuarioReservasDTO>();
        return usuarioDTO;
    }
    
    public async Task<List<UsuarioReservasDTO>> GetUsuarios()
    {
        var usuarios = await usuarioRepository.GetUsuarios();
        var usuariosDTO = usuarios.Adapt<List<UsuarioReservasDTO>>();
        return usuariosDTO;
    }

    public async Task<string> Login(UsuarioLoginDTO usuarioLoginDTO)
    {
        return await usuarioRepository.Login(usuarioLoginDTO);
    }

    public async Task<UsuarioDTO> Registro(UsuarioRegistroDTO usuarioRegistroDTO)
    {
        var usuario = await usuarioRepository.Registro(usuarioRegistroDTO);

        return usuario.Adapt<UsuarioDTO>();
    }
}
