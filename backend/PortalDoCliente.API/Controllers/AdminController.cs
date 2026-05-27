using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalDoCliente.API.DTOs;
using PortalDoCliente.Domain.Entities;
using PortalDoCliente.Domain.Enums;
using PortalDoCliente.Infrastructure.Data;
using PortalDoCliente.Infrastructure.Security;

namespace PortalDoCliente.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher _passwordHasher;
        private readonly CodigoAcessoGenerator _codigoGenerator;

        public AdminController(
            AppDbContext context,
            PasswordHasher passwordHasher,
            CodigoAcessoGenerator codigoGenerator)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _codigoGenerator = codigoGenerator;
        }

        /// <summary>
        /// Cria um paciente e gera o código de primeiro acesso.
        /// O código é exibido UMA ÚNICA VEZ na resposta.
        /// O paciente usa este código para criar sua senha definitiva.
        /// </summary>
        [HttpPost("pacientes")]
        public async Task<ActionResult<PacienteCriadoResponse>> CriarPaciente([FromBody] CriarPacienteRequest request)
        {
            var emailExiste = await _context.Usuarios.AnyAsync(u => u.Email == request.Email);
            if (emailExiste)
                return Conflict(new { mensagem = "Este email já está cadastrado." });

            var codigoAcesso = _codigoGenerator.GerarCodigo();

            // Validar CPF único se informado
            if (!string.IsNullOrWhiteSpace(request.Cpf))
            {
                var cpfExiste = await _context.Usuarios.AnyAsync(u => u.Cpf == request.Cpf);
                if (cpfExiste)
                    return Conflict(new { mensagem = "Este CPF já está cadastrado." });
            }

            var paciente = new Usuario
            {
                Nome = request.Nome,
                Email = request.Email,
                Cpf = request.Cpf,
                DataNascimento = request.DataNascimento,
                Senha = _passwordHasher.Hash(codigoAcesso),
                Perfil = Perfil.Paciente,
                PrimeiroAcesso = true,
                EmailConfirmado = false
            };

            _context.Usuarios.Add(paciente);
            await _context.SaveChangesAsync();

            return Created($"/api/admin/pacientes/{paciente.Id}", new PacienteCriadoResponse
            {
                Id = paciente.Id,
                Nome = paciente.Nome,
                Email = paciente.Email,
                CodigoAcesso = codigoAcesso
            });
        }

        /// <summary>
        /// Lista todos os pacientes cadastrados com status de acesso e email.
        /// </summary>
        [HttpGet("pacientes")]
        public async Task<ActionResult<List<PacienteResumoResponse>>> ListarPacientes()
        {
            var pacientes = await _context.Usuarios
                .Where(u => u.Perfil == Perfil.Paciente)
                .OrderByDescending(u => u.DataCriacao)
                .Select(u => new PacienteResumoResponse
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email,
                    Cpf = u.Cpf,
                    DataNascimento = u.DataNascimento,
                    Ativo = u.Ativo,
                    PrimeiroAcesso = u.PrimeiroAcesso,
                    EmailConfirmado = u.EmailConfirmado,
                    DataCriacao = u.DataCriacao
                })
                .ToListAsync();

            return Ok(pacientes);
        }

        /// <summary>
        /// Gera um novo código de primeiro acesso (reseta tudo).
        /// O paciente volta ao estado inicial — precisa criar senha e confirmar email novamente.
        /// </summary>
        [HttpPost("pacientes/{id}/resetar-acesso")]
        public async Task<ActionResult<ResetarSenhaResponse>> ResetarAcesso(Guid id)
        {
            var paciente = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id && u.Perfil == Perfil.Paciente);

            if (paciente == null)
                return NotFound(new { mensagem = "Paciente não encontrado." });

            var novoCodigo = _codigoGenerator.GerarCodigo();
            paciente.Senha = _passwordHasher.Hash(novoCodigo);
            paciente.PrimeiroAcesso = true;
            paciente.EmailConfirmado = false;
            paciente.TokenConfirmacaoEmail = null;
            paciente.TokenConfirmacaoExpiracao = null;
            paciente.DataAtualizacao = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new ResetarSenhaResponse
            {
                Id = paciente.Id,
                Nome = paciente.Nome,
                NovoCodigo = novoCodigo
            });
        }

        /// <summary>
        /// Desativa um paciente (não deleta do banco).
        /// </summary>
        [HttpPatch("pacientes/{id}/desativar")]
        public async Task<ActionResult> DesativarPaciente(Guid id)
        {
            var paciente = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id && u.Perfil == Perfil.Paciente);

            if (paciente == null)
                return NotFound(new { mensagem = "Paciente não encontrado." });

            paciente.Ativo = false;
            paciente.DataAtualizacao = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { mensagem = $"Paciente {paciente.Nome} desativado." });
        }

        /// <summary>
        /// Reativa um paciente desativado.
        /// </summary>
        [HttpPatch("pacientes/{id}/ativar")]
        public async Task<ActionResult> AtivarPaciente(Guid id)
        {
            var paciente = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id && u.Perfil == Perfil.Paciente);

            if (paciente == null)
                return NotFound(new { mensagem = "Paciente não encontrado." });

            paciente.Ativo = true;
            paciente.DataAtualizacao = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { mensagem = $"Paciente {paciente.Nome} ativado." });
        }
    }
}
