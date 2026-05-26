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

namespace PortalDoCliente.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher _passwordHasher;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, PasswordHasher passwordHasher, IConfiguration config)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Ativo);

            if (usuario == null || !_passwordHasher.Verify(request.Senha, usuario.Senha))
                return Unauthorized(new { mensagem = "Email ou senha inválidos." });

            var token = GenerateToken(usuario);
            var expiracao = DateTime.UtcNow.AddHours(8);

            return Ok(new AuthResponse
            {
                Token = token,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Expiracao = expiracao
            });
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<AuthResponse>> Registrar([FromBody] RegisterRequest request)
        {
            var emailExiste = await _context.Usuarios.AnyAsync(u => u.Email == request.Email);
            if (emailExiste)
                return Conflict(new { mensagem = "Este email já está cadastrado." });

            var usuario = new Usuario
            {
                Nome = request.Nome,
                Email = request.Email,
                Senha = _passwordHasher.Hash(request.Senha)
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            var token = GenerateToken(usuario);
            var expiracao = DateTime.UtcNow.AddHours(8);

            return Created($"/api/usuarios/{usuario.Id}", new AuthResponse
            {
                Token = token,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Expiracao = expiracao
            });
        }

        private string GenerateToken(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, usuario.Nome)
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
