using System.Security.Cryptography;

namespace PortalDoCliente.Infrastructure.Security
{
    public class TokenGenerator
    {
        /// <summary>
        /// Gera um código numérico de 6 dígitos para confirmação de email.
        /// </summary>
        public string GerarTokenEmail()
        {
            var numero = RandomNumberGenerator.GetInt32(100000, 999999);
            return numero.ToString();
        }
    }
}
