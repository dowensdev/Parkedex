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
        public DbSet<VisitedPark> VisitedParks { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //One to Many relationship between Parks and ImageReferences
            modelBuilder.Entity<Park>()
            .HasMany(i => i.Images)
            .WithOne()
            .HasPrincipalKey(p => p.ParkCode).IsRequired()
            .HasForeignKey(p => p.ParkCode)
            .OnDelete(DeleteBehavior.Cascade);

            //Many to many relationship between Parks and AppUsers
            modelBuilder.Entity<VisitedPark>(x => x.HasKey(vp => new { vp.AppUserId, vp.ParkId }));
            modelBuilder.Entity<VisitedPark>()
                .HasOne(u => u.AppUser)
                .WithMany(p => p.ParksVisited)
                .HasForeignKey(vp => vp.AppUserId);
            modelBuilder.Entity<VisitedPark>()
                .HasOne(p => p.Park)
                .WithMany(u => u.Visitors)
                .HasForeignKey(vp => vp.ParkId);

            //One to many park to comments relationship
            modelBuilder.Entity<Comment>()
                .HasOne(p => p.Park)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}