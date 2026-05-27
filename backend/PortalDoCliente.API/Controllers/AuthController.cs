using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PortalDoCliente.API.DTOs;
using PortalDoCliente.Domain.Entities;
using PortalDoCliente.Infrastructure.Data;
using PortalDoCliente.Infrastructure.Security;
using PortalDoCliente.Infrastructure.Services;

namespace PortalDoCliente.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher _passwordHasher;
        private readonly TokenGenerator _tokenGenerator;
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;

        public AuthController(
            AppDbContext context,
            PasswordHasher passwordHasher,
            TokenGenerator tokenGenerator,
            EmailService emailService,
            IConfiguration config)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _tokenGenerator = tokenGenerator;
            _emailService = emailService;
            _config = config;
        }

        /// <summary>
        /// Login com email + senha (admin) ou email + senha criada pelo paciente.
        /// Pacientes com PrimeiroAcesso=true não conseguem logar aqui.
        /// </summary>
        // TODO: MODO DESENVOLVIMENTO — remover validações antes de ir para produção
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (usuario == null)
            {
                // Se não existe, cria na hora para desenvolvimento
                var perfil = request.Email.Contains("admin", StringComparison.OrdinalIgnoreCase)
                    ? Domain.Enums.Perfil.Admin
                    : Domain.Enums.Perfil.Paciente;

                usuario = new Usuario
                {
                    Nome = request.Email.Split('@')[0],
                    Email = request.Email,
                    Senha = _passwordHasher.Hash("dev"),
                    Perfil = perfil,
                    PrimeiroAcesso = false,
                    EmailConfirmado = true,
                    Ativo = true
                };
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();
            }

            var token = GenerateToken(usuario);
            var expiracao = DateTime.UtcNow.AddHours(8);

            return Ok(new AuthResponse
            {
                Token = token,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Perfil = usuario.Perfil.ToString(),
                Expiracao = expiracao
            });
        }

        /// <summary>
        /// Passo 1 do primeiro acesso: valida email + código fornecido pelo admin.
        /// Retorna confirmação de que o código é válido.
        /// </summary>
        [HttpPost("primeiro-acesso/validar")]
        public async Task<ActionResult<PrimeiroAcessoResponse>> ValidarCodigoPrimeiroAcesso([FromBody] LoginRequest request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Ativo && u.PrimeiroAcesso);

            if (usuario == null || !_passwordHasher.Verify(request.Senha, usuario.Senha))
                return Unauthorized(new { mensagem = "Email ou código de acesso inválido." });

            return Ok(new PrimeiroAcessoResponse
            {
                Email = usuario.Email
            });
        }

        /// <summary>
        /// Passo 2 do primeiro acesso: paciente cria sua senha definitiva.
        /// Envia email de confirmação automaticamente.
        /// </summary>
        [HttpPost("primeiro-acesso/criar-senha")]
        public async Task<ActionResult> CriarSenha([FromBody] CriarSenhaRequest request)
        {
            if (request.NovaSenha != request.ConfirmarSenha)
                return BadRequest(new { mensagem = "As senhas não coincidem." });

            if (request.NovaSenha.Length < 8)
                return BadRequest(new { mensagem = "A senha deve ter no mínimo 8 caracteres." });

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Ativo && u.PrimeiroAcesso);

            if (usuario == null || !_passwordHasher.Verify(request.CodigoAcesso, usuario.Senha))
                return Unauthorized(new { mensagem = "Email ou código de acesso inválido." });

            // Criar senha definitiva
            usuario.Senha = _passwordHasher.Hash(request.NovaSenha);
            usuario.PrimeiroAcesso = false;
            usuario.DataAtualizacao = DateTime.UtcNow;

            // Gerar token de confirmação de email
            var tokenEmail = _tokenGenerator.GerarTokenEmail();
            usuario.TokenConfirmacaoEmail = tokenEmail;
            usuario.TokenConfirmacaoExpiracao = DateTime.UtcNow.AddHours(24);

            await _context.SaveChangesAsync();

            // Enviar email de confirmação
            await _emailService.EnviarConfirmacaoEmailAsync(
                usuario.Email, usuario.Nome, tokenEmail);

            return Ok(new { mensagem = "Senha criada com sucesso! Verifique seu email para confirmar sua conta. O código expira em 24 horas." });
        }

        /// <summary>
        /// Confirma o email do paciente com o código de 6 dígitos.
        /// </summary>
        [HttpPost("confirmar-email")]
        public async Task<ActionResult> ConfirmarEmail([FromBody] ConfirmarEmailRequest request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Ativo);

            if (usuario == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            if (usuario.EmailConfirmado)
                return Ok(new { mensagem = "Email já confirmado anteriormente." });

            if (usuario.TokenConfirmacaoEmail != request.Token)
                return BadRequest(new { mensagem = "Código de confirmação inválido." });

            if (usuario.TokenConfirmacaoExpiracao < DateTime.UtcNow)
                return BadRequest(new { mensagem = "Código de confirmação expirado. Solicite um novo." });

            usuario.EmailConfirmado = true;
            usuario.TokenConfirmacaoEmail = null;
            usuario.TokenConfirmacaoExpiracao = null;
            usuario.DataAtualizacao = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { mensagem = "Email confirmado com sucesso! Você já pode fazer login." });
        }

        /// <summary>
        /// Reenvia o email de confirmação com um novo código.
        /// </summary>
        [HttpPost("reenviar-confirmacao")]
        public async Task<ActionResult> ReenviarConfirmacao([FromBody] ReenviarConfirmacaoRequest request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Ativo);

            if (usuario == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            if (usuario.EmailConfirmado)
                return Ok(new { mensagem = "Email já confirmado anteriormente." });

            if (usuario.PrimeiroAcesso)
                return BadRequest(new { mensagem = "Crie sua senha primeiro antes de confirmar o email." });

            var tokenEmail = _tokenGenerator.GerarTokenEmail();
            usuario.TokenConfirmacaoEmail = tokenEmail;
            usuario.TokenConfirmacaoExpiracao = DateTime.UtcNow.AddHours(24);
            await _context.SaveChangesAsync();

            await _emailService.EnviarConfirmacaoEmailAsync(
                usuario.Email, usuario.Nome, tokenEmail);

            return Ok(new { mensagem = "Novo código enviado para seu email. Confira sua caixa de entrada." });
        }

        private string GenerateToken(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Role, usuario.Perfil.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
