using PortalDoCliente.Domain.Enums;

namespace PortalDoCliente.Domain.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Email { get; set; }
        public required string Senha { get; set; }
        public required string Nome { get; set; }
        public string? Cpf { get; set; }
        public DateTime? DataNascimento { get; set; }
        public Perfil Perfil { get; set; } = Perfil.Paciente;

        // Primeiro acesso: código temporário dado pelo admin
        public bool PrimeiroAcesso { get; set; } = true;

        // Confirmação de email
        public bool EmailConfirmado { get; set; } = false;
        public string? TokenConfirmacaoEmail { get; set; }
        public DateTime? TokenConfirmacaoExpiracao { get; set; }

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
        public DateTime? DataAtualizacao { get; set; }
        public bool Ativo { get; set; } = true;
    }
}
