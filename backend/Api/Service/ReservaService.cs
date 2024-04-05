using Api.DataContext;
using Api.Domain;
using Api.Endpoints.DTO;
using Api.Repository;
using Mapster;

namespace Api.Service;

public interface IReservaService
{
    Task<List<ReservaDTO>> GetAllReservas();
    Task<ReservaDTO> GetReservaById(int idReserva);
    void CreateReserva(ReservaCreacionDTO reservaCreacionDTO, string barrio);
    Task<ReservaDTO> UpdateEstadoReserva(int idReserva, EstadoReserva estado);
    void DeleteReserva(int idReserva);
    Task<bool> NegarReserva(string idUsuario);
}

public class ReservaService(IReservaRepository reservaRepository, IProductoRepository productoRepository, IUsuarioRepository usuarioRepository) : IReservaService
{
    public async void CreateReserva(ReservaCreacionDTO reservaCreacionDTO, string barrio)
    {
        var producto = await productoRepository.GetProducto(reservaCreacionDTO.ProductoId);

        if (producto is null)
            throw new Exception($"El producto con Id {reservaCreacionDTO.ProductoId} no existe");

        var usuario = await usuarioRepository.GetUsuario(reservaCreacionDTO.UsuarioId);

        if (usuario is null)
            throw new Exception($"El usuario con Id {reservaCreacionDTO.UsuarioId} no existe");

        if (await NegarReserva(usuario.Id))
            throw new Exception($"El usuario con Id {usuario.Id} y nombre {usuario.UserName} posee el maximo de 3 reservas ingresadas");

        reservaRepository.AddReserva(producto, usuario, reservaCreacionDTO.NombreCliente, barrio);
    }

    public async Task<ReservaDTO> GetReservaById(int idReserva)
    {
        var reserva = await reservaRepository.GetReserva(idReserva);
        var reservaDTO = reserva.Adapt<ReservaDTO>();
        return reservaDTO;
    }

    public async Task<List<ReservaDTO>> GetAllReservas()
    {
        var reserva = await reservaRepository.GetReservas();
        var reservaDTO = reserva.Adapt<List<ReservaDTO>>();
        return reservaDTO;
    }

    public void DeleteReserva(int idReserva)
    {
        reservaRepository.RemoveReserva(idReserva);
    }

    public async Task<ReservaDTO> UpdateEstadoReserva(int idReserva, EstadoReserva estado)
    {
        var reserva = await reservaRepository.UpdateEstadoReserva(idReserva, estado);
        var reservaDTO = reserva.Adapt<ReservaDTO>();
        return reservaDTO;
    }

    public async Task<bool> NegarReserva(string idUsuario)
    {
        var reservas = await reservaRepository.GetReservasByUsuario(idUsuario);
        if (reservas.Count == 3)
        {
            return true;
        }
        return false;
    }
}
