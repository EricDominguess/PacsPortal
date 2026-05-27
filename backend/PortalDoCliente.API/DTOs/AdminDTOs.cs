namespace PortalDoCliente.API.DTOs
{
    public class CriarPacienteRequest
    {
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public string? Cpf { get; set; }
        public DateTime? DataNascimento { get; set; }
    }

    public class PacienteCriadoResponse
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required string CodigoAcesso { get; set; }
        public string Mensagem { get; set; } = "Codigo de primeiro acesso gerado. Entregue ao paciente. Este codigo nao sera exibido novamente.";
    }

    public class PacienteResumoResponse
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public string? Cpf { get; set; }
        public DateTime? DataNascimento { get; set; }
        public bool Ativo { get; set; }
        public bool PrimeiroAcesso { get; set; }
        public bool EmailConfirmado { get; set; }
        public DateTime DataCriacao { get; set; }
    }

    public class ResetarSenhaResponse
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string NovoCodigo { get; set; }
        public string Mensagem { get; set; } = "Novo codigo de primeiro acesso gerado. Entregue ao paciente. Este codigo nao sera exibido novamente.";
    }
}
