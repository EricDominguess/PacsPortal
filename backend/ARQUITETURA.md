# Arquitetura do Backend - Portal do Cliente

## 📋 Visão Geral

O backend do Portal do Cliente foi desenvolvido em **C# .NET 8** seguindo os princípios de arquitetura em camadas. O projeto está organizado em 3 camadas principais, cada uma com responsabilidades bem definidas, garantindo escalabilidade, manutenibilidade e separação de conceitos.

---

## 🏗️ Estrutura de Camadas

### 1. **PortalDoCliente.API** (Camada de Apresentação)
**Localização:** `backend/PortalDoCliente.API/`

Responsável por:
- Expor os endpoints REST da aplicação
- Receber requisições HTTP dos clientes (web/mobile)
- Retornar respostas formatadas em JSON
- Orquestrar a comunicação entre camadas

**Componentes principais:**
- **Program.cs**: Arquivo de configuração e inicialização da aplicação
- **Controllers/UsuariosController.cs**: Controller que gerencia operações relacionadas a usuários

**Dependências:**
- ASP.NET Core 8.0
- Entity Framework Core 8.0
- Swagger/OpenAPI 6.4.6
- Npgsql.EntityFrameworkCore.PostgreSQL 8.0.0

---

### 2. **PortalDoCliente.Domain** (Camada de Domínio)
**Localização:** `backend/PortalDoCliente.Domain/`

Responsável por:
- Definir as entidades de negócio da aplicação
- Conter as regras de negócio fundamentais
- Ser independente de qualquer framework externo

**Componentes principais:**
- **Entities/Usuario.cs**: Entidade que representa um usuário no sistema

---

### 3. **PortalDoCliente.Infrastructure** (Camada de Infraestrutura)
**Localização:** `backend/PortalDoCliente.Infrastructure/`

Responsável por:
- Implementar acesso a dados
- Configurar o banco de dados
- Gerenciar a persistência de dados

**Componentes principais:**
- **Data/AppDbContext.cs**: Context do Entity Framework Core que gerencia o banco de dados

---

## 📊 Entidades do Domínio

### Usuario
**Localização:** `PortalDoCliente.Domain/Entities/Usuario.cs`

Representa um usuário no sistema com os seguintes atributos:

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `Id` | Guid | Identificador único do usuário (chave primária) |
| `Email` | string | Email do usuário (obrigatório, máx 255 caracteres) |
| `Senha` | string | Senha do usuário (obrigatório, criptografado) |
| `Nome` | string | Nome completo do usuário (obrigatório, máx 255 caracteres) |
| `DataCriacao` | DateTime | Data e hora de criação do registro (UTC) |
| `DataAtualizacao` | DateTime? | Data e hora da última atualização (nullable) |
| `Ativo` | bool | Status do usuário (true = ativo, false = inativo) |

---

## 🗄️ Banco de Dados

### Configuração
- **Tipo:** PostgreSQL
- **Connection String:** Lida de `appsettings.json` com a chave "PostgreSQL"
- **ORM:** Entity Framework Core 8.0

### Configurações da Entidade Usuario

No `AppDbContext.cs`, a entidade `Usuario` é configurada com:
- **Chave primária:** `Id` (Guid)
- **Colunas:**
  - `Email`: Obrigatória, máx 255 caracteres
  - `Senha`: Obrigatória
  - `Nome`: Obrigatária, máx 255 caracteres
  - `DataCriacao`: Valor padrão gerado automaticamente pelo banco de dados (CURRENT_TIMESTAMP)

---

## 🚀 Configuração da API

### Program.cs - Inicialização da Aplicação

**O que foi configurado:**

1. **Controllers e Swagger**
   ```csharp
   builder.Services.AddControllers();
   builder.Services.AddOpenApi();
   builder.Services.AddSwaggerGen();
   ```

2. **Banco de Dados**
   ```csharp
   var connectionString = builder.Configuration.GetConnectionString("PostgreSQL");
   builder.Services.AddDbContext<AppDbContext>(options =>
       options.UseNpgsql(connectionString));
   ```

3. **Middleware em Desenvolvimento**
   - Swagger UI habilitada
   - OpenAPI endpoint disponível

4. **Middleware em Produção**
   - Redirecionamento HTTPS ativado
   - Autorização configurada

---

## 🔌 Endpoints

### GET /api/usuarios
**Descrição:** Verifica se a API está funcionando

**Resposta de sucesso:**
```json
{
  "mensagem": "API está funcionando!"
}
```

**Status HTTP:** 200 OK

---

## 📦 Dependências Externas

| Pacote | Versão | Propósito |
|--------|--------|----------|
| Microsoft.AspNetCore.OpenApi | 8.0.0 | Suporte a OpenAPI/Swagger |
| Swashbuckle.AspNetCore | 6.4.6 | Geração de documentação Swagger |
| Microsoft.EntityFrameworkCore | 8.0.0 | ORM para acesso a dados |
| Microsoft.EntityFrameworkCore.Tools | 8.0.0 | Ferramentas para migrations |
| Npgsql.EntityFrameworkCore.PostgreSQL | 8.0.0 | Driver PostgreSQL |

---

## 🔍 Fluxo de uma Requisição

1. **Cliente** envia uma requisição HTTP para um endpoint
2. **UsuariosController** recebe a requisição
3. O controller injeta o **AppDbContext** para acessar dados
4. **AppDbContext** utiliza o **Entity Framework Core** para consultar/manipular dados
5. A entidade **Usuario** é recuperada/manipulada do banco de dados
6. A resposta é formatada em JSON e retornada ao cliente

---

## 📝 Padrões Utilizados

- **Injeção de Dependência:** AppDbContext é injetado nos controllers
- **Repository Pattern (potencial):** AppDbContext funciona como um repositório central
- **Entity Framework Pattern:** Utilização do ORM para abstrair a complexidade do banco de dados
- **RESTful API:** Endpoints seguem convenções REST

---

## 🛠️ Como Executar

### Pré-requisitos
- .NET SDK 8.0 ou superior
- PostgreSQL 12+

### Passos
1. Restaurar dependências: `dotnet restore`
2. Atualizar banco de dados com migrations: `dotnet ef database update`
3. Executar a API: `dotnet run`
4. Acessar Swagger em: `https://localhost:5001/swagger`

---

## 📚 Próximas Etapas Recomendadas

1. **Implementar operações CRUD** completas para usuários
2. **Adicionar autenticação e autorização** (JWT, OAuth)
3. **Implementar validações** de dados
4. **Criar Services** para lógica de negócio
5. **Implementar padrão Repository** explícito
6. **Adicionar tratamento de erros** global
7. **Implementar logging** estruturado
8. **Adicionar testes unitários** e de integração

---

**Versão:** 1.0  
**Data:** Maio 2026  
**Framework:** .NET 8.0 | C#
