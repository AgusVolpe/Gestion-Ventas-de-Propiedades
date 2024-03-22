using Mapster;
using Api.Domain;
using Api.Endpoints.DTO;
using Microsoft.AspNetCore.Identity;


namespace Api.Utilities;

public class MapsterMapper : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Producto, ProductoDTO>();
        config.NewConfig<ProductoDTO, Producto>();

        //config.NewConfig<Reserva, ReservaDTO>().Ignore(d => d.Usuario);
        config.NewConfig<Reserva, ReservaDTO>();
        config.NewConfig<Reserva, ReservaUsuarioDTO>();
        config.NewConfig<ReservaDTO, Reserva>();

        //config.NewConfig<Usuario, UsuarioDTO>().Ignore(d => d.Reservas);
        config.NewConfig<Usuario, UsuarioDTO>();
        config.NewConfig<Usuario, UsuarioReservasDTO>();
        config.NewConfig<UsuarioDTO, Usuario>();
        config.NewConfig<Usuario, UsuarioRespuestaLoginDTO>();


        //config.NewConfig<IdentityRole, RolDTO>();
    }
}
