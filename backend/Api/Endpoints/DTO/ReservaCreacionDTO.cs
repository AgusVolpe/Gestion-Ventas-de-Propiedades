using Api.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Endpoints.DTO;

//public class ReservaCreacionDTO
//{
//    public required int IdProducto { get; set; }
//    public required int IdUser { get; set; }
//}
public record ReservaCreacionDTO(int IdProducto, string NombreCliente);
