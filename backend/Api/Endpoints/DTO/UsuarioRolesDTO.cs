namespace Api.Endpoints.DTO
{
    public class UsuarioRolesDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public List<RolDTO> Roles { get; set; } = [];
    }
}
