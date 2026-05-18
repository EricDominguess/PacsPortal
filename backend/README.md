# Portal do Cliente - Backend

Backend da aplicação Portal do Cliente desenvolvido em .NET 8 com Entity Framework Core e PostgreSQL.

## Estrutura do Projeto

```
PortalDoCliente.API/           # API REST
PortalDoCliente.Domain/        # Modelos e interfaces (entidades)
PortalDoCliente.Infrastructure/ # Acesso a dados, EF Core
```

## Configuração do Banco de Dados

### Conexão PostgreSQL
- **Host**: IP público da VM Debian
- **Porta**: 5432
- **Database**: pacs_portal_db
- **Usuário**: admin
- **Senha**: admin@123

### Connection String
Atualizar em `appsettings.json` e `appsettings.Development.json`:
```
Host=YOUR_VM_IP;Port=5432;Database=pacs_portal_db;Username=admin;Password=admin@123
```

## Requisitos
- .NET 8 SDK
- PostgreSQL 12+
- Visual Studio Code ou Visual Studio

## Como Executar

### 1. Restaurar dependências
```bash
dotnet restore
```

### 2. Aplicar migrations
```bash
dotnet ef database update --project PortalDoCliente.Infrastructure
```

### 3. Executar a aplicação
```bash
dotnet run --project PortalDoCliente.API
```

A API estará disponível em: `https://localhost:5001`
Swagger estará em: `https://localhost:5001/swagger`

## Próximos Passos
- [ ] Implementar autenticação JWT
- [ ] Criar endpoints de registro e login
- [ ] Implementar validações
- [ ] Adicionar testes unitários
