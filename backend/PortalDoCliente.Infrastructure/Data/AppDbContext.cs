using Microsoft.EntityFrameworkCore;
using PortalDoCliente.Domain.Entities;

namespace PortalDoCliente.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Senha).IsRequired();
                entity.Property(u => u.Nome).IsRequired().HasMaxLength(255);
                entity.Property(u => u.Cpf).HasMaxLength(14);
                entity.HasIndex(u => u.Cpf).IsUnique().HasFilter("\"Cpf\" IS NOT NULL");
                entity.Property(u => u.Perfil).IsRequired().HasDefaultValue(Domain.Enums.Perfil.Paciente);
                entity.Property(u => u.PrimeiroAcesso).IsRequired().HasDefaultValue(true);
                entity.Property(u => u.EmailConfirmado).IsRequired().HasDefaultValue(false);
                entity.Property(u => u.TokenConfirmacaoEmail).HasMaxLength(10);
                entity.Property(u => u.DataCriacao).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
