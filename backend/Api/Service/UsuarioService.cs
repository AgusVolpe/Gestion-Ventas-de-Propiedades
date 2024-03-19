using Api.Domain;
using Api.Endpoints.DTO;
using Api.Repository;
using Mapster;

namespace Api.Service;

public interface IUsuarioService
{
    Task<List<UsuarioDTO>> GetUsuarios();
    Task<UsuarioDTO> GetUsuario(string idUsuario);
    Task<UsuarioDTO> Registro(UsuarioRegistroDTO usuarioRegistroDTO);
    Task<UsuarioRespuestaLoginDTO> Login(UsuarioLoginDTO usuarioLoginDTO);
}

public class UsuarioService(IUsuarioRepository usuarioRepository) : IUsuarioService
{
    public async Task<UsuarioDTO> GetUsuario(string idUsuario)
    {
        var usuario = await usuarioRepository.GetUsuario(idUsuario);
        var usuarioDTO = usuario.Adapt<UsuarioDTO>();
        return usuarioDTO;
    }
    
    public async Task<List<UsuarioDTO>> GetUsuarios()
    {
        var usuarios = await usuarioRepository.GetUsuarios();
        var usuariosDTO = usuarios.Adapt<List<UsuarioDTO>>();
        return usuariosDTO;
    }

    public async Task<UsuarioRespuestaLoginDTO> Login(UsuarioLoginDTO usuarioLoginDTO)
    {
        return await usuarioRepository.Login(usuarioLoginDTO);
    }

    public async Task<UsuarioDTO> Registro(UsuarioRegistroDTO usuarioRegistroDTO)
    {
        var usuario = await usuarioRepository.Registro(usuarioRegistroDTO);

        return usuario.Adapt<UsuarioDTO>();
    }
}
