using System.Security.Cryptography;

namespace PortalDoCliente.Infrastructure.Security
{
    public class CodigoAcessoGenerator
    {
        /// <summary>
        /// Gera um código aleatório no formato ABC-1234-XYZ (letras maiúsculas + números).
        /// Fácil de ler, digitar e imprimir para entregar ao paciente.
        /// </summary>
        public string GerarCodigo()
        {
            var parte1 = GerarLetras(3);
            var parte2 = GerarNumeros(4);
            var parte3 = GerarLetras(3);
            return $"{parte1}-{parte2}-{parte3}";
        }

        private static string GerarLetras(int tamanho)
        {
            const string caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // sem I e O (confundem com 1 e 0)
            return GerarAleatorio(caracteres, tamanho);
        }

        private static string GerarNumeros(int tamanho)
        {
            const string caracteres = "23456789"; // sem 0 e 1 (confundem com O e I)
            return GerarAleatorio(caracteres, tamanho);
        }

        private static string GerarAleatorio(string caracteres, int tamanho)
        {
            var resultado = new char[tamanho];
            for (int i = 0; i < tamanho; i++)
            {
                resultado[i] = caracteres[RandomNumberGenerator.GetInt32(caracteres.Length)];
            }
            return new string(resultado);
        }
    }
}
