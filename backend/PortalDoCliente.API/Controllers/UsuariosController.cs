using Microsoft.AspNetCore.Mvc;
using PortalDoCliente.Infrastructure.Data;

namespace PortalDoCliente.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok(new { mensagem = "API está funcionando!" });
        }
    }
}
