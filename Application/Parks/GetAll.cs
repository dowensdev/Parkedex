using Application.Core;
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

namespace Application.Parks
{
    public class GetAll
    {
        public class Query : IRequest<Result<List<Park>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Park>>>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<Result<List<Park>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var parks = await _db.Parks.ToListAsync();

                foreach(Park park in parks)
                {
                    park.Images = await _db.ImageReferences.Where(x => x.ParkCode == park.ParkCode).ToListAsync();
                }

                return Result<List<Park>>.Success(parks);
            }
        }
    }
}
