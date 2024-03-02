using Api.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Endpoints.DTO;

//public class ReservaDTO
//{
//    public int Id { get; set; }
//    public int IdProducto { get; set; }
//    public int IdUser { get; set; }
//    public EstadoReserva Estado { get; set; }
//}
public record ReservaDTO(int Id, int IdProducto, string NombreCliente, EstadoReserva Estado);