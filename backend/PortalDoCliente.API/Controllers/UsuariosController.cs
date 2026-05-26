using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalDoCliente.Infrastructure.Data;

namespace PortalDoCliente.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var usuarios = await _context.Usuarios
                .Where(u => u.Ativo)
                .Select(u => new { u.Id, u.Nome, u.Email, u.DataCriacao })
                .ToListAsync();

            return Ok(usuarios);
        }
    }
}
