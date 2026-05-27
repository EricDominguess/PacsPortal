namespace PortalDoCliente.API.DTOs
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }

    public class AuthResponse
    {
        public required string Token { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required string Perfil { get; set; }
        public DateTime Expiracao { get; set; }
    }

    public class PrimeiroAcessoResponse
    {
        public bool PrimeiroAcesso { get; set; } = true;
        public required string Email { get; set; }
        public string Mensagem { get; set; } = "Código validado. Crie sua senha para continuar.";
    }

    public class CriarSenhaRequest
    {
        public required string Email { get; set; }
        public required string CodigoAcesso { get; set; }
        public required string NovaSenha { get; set; }
        public required string ConfirmarSenha { get; set; }
    }

    public class ConfirmarEmailRequest
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
    }

    public class ReenviarConfirmacaoRequest
    {
        public required string Email { get; set; }
    }
}
