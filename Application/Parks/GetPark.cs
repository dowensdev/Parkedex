﻿using Application.Core;
using Application.Core.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class GetPark
    {
        public class Query : IRequest<Result<Park>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Park>>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<Result<Park>> Handle(Query request, CancellationToken cancellationToken)
            {
                var park = await _db.Parks.FindAsync(request.Id);
                return Result<Park>.Success(park);
            }
        }
    }
}
