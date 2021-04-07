using Application.Core.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastucture.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
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
            modelBuilder.Entity<Park>()
            .HasMany(i => i.Images)
            .WithOne(p => p.Park)
            .HasPrincipalKey(p => p.ParkCode)
            .HasForeignKey(p => p.ParkCode)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}