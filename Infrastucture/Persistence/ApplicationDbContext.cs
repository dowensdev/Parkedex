using Application.Core.Interfaces;
using Domain;
using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Infrastucture.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Park> Parks { get; set; }
        public DbSet<ImageReference> ImageReferences { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Park>()
            .HasMany(i => i.Images)
            .WithOne()
            .HasPrincipalKey(p => p.ParkCode).IsRequired()
            .HasForeignKey(p => p.ParkCode)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}