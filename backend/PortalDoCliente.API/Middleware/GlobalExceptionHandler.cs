using System.Net;
using System.Text.Json;

namespace PortalDoCliente.API.Middleware
{
    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro não tratado: {Message}", ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var env = context.RequestServices.GetService<IHostEnvironment>();
            object response;
            if (env?.IsDevelopment() == true)
            {
                response = new { mensagem = "Erro interno no servidor.", erro = ex.Message, stack = ex.StackTrace };
            }
            else
            {
                response = new { mensagem = "Ocorreu um erro interno no servidor." };
            }

            var json = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(json);
        }
    }
}
