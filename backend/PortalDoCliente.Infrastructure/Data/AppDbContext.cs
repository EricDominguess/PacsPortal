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

            // Configure Usuario entity
            modelBuilder.Entity<Usuario>().HasKey(u => u.Id);
            modelBuilder.Entity<Usuario>().Property(u => u.Email).IsRequired().HasMaxLength(255);
            modelBuilder.Entity<Usuario>().Property(u => u.Senha).IsRequired();
            modelBuilder.Entity<Usuario>().Property(u => u.Nome).IsRequired().HasMaxLength(255);
            modelBuilder.Entity<Usuario>().Property(u => u.DataCriacao).HasDefaultValueSql("CURRENT_TIMESTAMP");
        }
    }
}
