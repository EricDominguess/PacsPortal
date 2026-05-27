using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace PortalDoCliente.Infrastructure.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration config, ILogger<EmailService> logger)
        {
            _config = config;
            _logger = logger;
        }

        /// <summary>
        /// Envia email de confirmação com código de 6 dígitos.
        /// </summary>
        public async Task EnviarConfirmacaoEmailAsync(string destinatario, string nomeUsuario, string token)
        {
            var assunto = "Portal do Cliente - Confirme seu email";
            var corpo = $@"
                <html>
                <body style='font-family: Arial, sans-serif; padding: 20px;'>
                    <h2>Olá, {nomeUsuario}!</h2>
                    <p>Você criou sua senha no Portal do Cliente. Para ativar sua conta, use o código abaixo:</p>
                    <div style='background: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;'>
                        <span style='font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;'>{token}</span>
                    </div>
                    <p>Este código expira em <strong>24 horas</strong>.</p>
                    <p>Se você não solicitou este acesso, ignore este email.</p>
                    <hr style='margin-top: 30px;'/>
                    <p style='color: #999; font-size: 12px;'>Portal do Cliente - Sistema de Imagens Médicas</p>
                </body>
                </html>";

            await EnviarEmailAsync(destinatario, assunto, corpo);
        }

        private async Task EnviarEmailAsync(string destinatario, string assunto, string corpoHtml)
        {
            var smtpHost = _config["Email:SmtpHost"];
            var smtpPort = int.Parse(_config["Email:SmtpPort"] ?? "587");
            var smtpUser = _config["Email:SmtpUser"];
            var smtpPass = _config["Email:SmtpPassword"];
            var remetente = _config["Email:Remetente"] ?? smtpUser;

            if (string.IsNullOrEmpty(smtpHost))
            {
                _logger.LogWarning("SMTP não configurado. Email não enviado para {Destinatario}. Token seria no corpo do email.", destinatario);
                _logger.LogInformation(">>> [DEV] Email para {Destinatario}: {Assunto}", destinatario, assunto);
                return;
            }

            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = true
            };

            var message = new MailMessage
            {
                From = new MailAddress(remetente!, "Portal do Cliente"),
                Subject = assunto,
                Body = corpoHtml,
                IsBodyHtml = true
            };
            message.To.Add(destinatario);

            try
            {
                await client.SendMailAsync(message);
                _logger.LogInformation("Email enviado para {Destinatario}", destinatario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao enviar email para {Destinatario}", destinatario);
                throw;
            }
        }
    }
}
