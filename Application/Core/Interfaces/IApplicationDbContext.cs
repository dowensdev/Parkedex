using Domain;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Core.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Park> Parks { get; set; }
        DbSet<ImageReference> ImageReferences { get; set; }
        DbSet<AppUser> Users { get; set; }
        DbSet<VisitedPark> VisitedParks { get; set; }
        DbSet<Comment> Comments { get; set; }
        Task<int> SaveChangesAsync();
    }
}
