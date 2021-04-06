using Application.Core;
using Application.Core.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class GetParkByParkCode
    {
        public class Query : IRequest<Result<Park>> 
        {
            public string ParkCode { get; set; }
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
                var park = await _db.Parks.FirstOrDefaultAsync(x => x.ParkCode == request.ParkCode);
                return Result<Park>.Success(park);
            }
        }
    }
}
