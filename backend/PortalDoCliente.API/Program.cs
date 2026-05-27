using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PortalDoCliente.Infrastructure.Data;
using PortalDoCliente.Infrastructure.Security;
using PortalDoCliente.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Security services
builder.Services.AddSingleton<PasswordHasher>();
builder.Services.AddSingleton<CodigoAcessoGenerator>();
builder.Services.AddSingleton<TokenGenerator>();
builder.Services.AddScoped<EmailService>();

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("PostgreSQL");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// CORS — origens padrão + origens extras via variável de ambiente CORS_ORIGINS
var corsOrigins = new List<string>
{
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:80"
};
var extraOrigins = builder.Configuration["CorsOrigins"];
if (!string.IsNullOrEmpty(extraOrigins))
{
    corsOrigins.AddRange(extraOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
}
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(corsOrigins.ToArray())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Migrate + Seed com retry (aguarda o banco estar pronto no Docker)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var hasher = scope.ServiceProvider.GetRequiredService<PasswordHasher>();

    var maxRetries = 10;
    for (var i = 0; i < maxRetries; i++)
    {
        try
        {
            db.Database.Migrate();
            Console.WriteLine(">>> Migrations aplicadas com sucesso.");
            break;
        }
        catch (Exception ex)
        {
            Console.WriteLine($">>> Tentativa {i + 1}/{maxRetries} - Banco não pronto: {ex.Message}");
            if (i == maxRetries - 1) throw;
            Thread.Sleep(3000);
        }
    }

    if (!db.Usuarios.Any(u => u.Perfil == PortalDoCliente.Domain.Enums.Perfil.Admin))
    {
        db.Usuarios.Add(new PortalDoCliente.Domain.Entities.Usuario
        {
            Nome = "Administrador",
            Email = "admin@hospital.com",
            Senha = hasher.Hash("admin123"),
            Perfil = PortalDoCliente.Domain.Enums.Perfil.Admin,
            PrimeiroAcesso = false,
            EmailConfirmado = true
        });
        db.SaveChanges();
        Console.WriteLine(">>> Admin padrão criado: admin@hospital.com / admin123");
        Console.WriteLine(">>> TROQUE A SENHA DO ADMIN APÓS O PRIMEIRO LOGIN!");
    }
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<PortalDoCliente.API.Middleware.GlobalExceptionHandler>();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
