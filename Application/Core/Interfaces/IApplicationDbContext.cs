﻿using Domain;
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
        Task<int> SaveChangesAsync();
    }
}