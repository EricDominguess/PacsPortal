namespace PortalDoCliente.API.DTOs
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }

    public class RegisterRequest
    {
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }

    public class AuthResponse
    {
        public required string Token { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public DateTime Expiracao { get; set; }
    }
}
