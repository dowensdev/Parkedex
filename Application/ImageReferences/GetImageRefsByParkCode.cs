using Application.Core;
using Application.Core.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ImageReferences
{
    public class GetImageRefsByParkCode
    {
        public class Query : IRequest<Result<List<ImageReference>>> 
        {
            public string ParkCode { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ImageReference>>>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<Result<List<ImageReference>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<ImageReference>>.Success(await _db.ImageReferences.Where(x => x.ParkCode == request.ParkCode).ToListAsync());
            }
        }
    }
}
