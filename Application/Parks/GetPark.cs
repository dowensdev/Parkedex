using Application.Core.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class GetPark
    {
        public class Query : IRequest<Park> 
        {
            public string ParkCode { get; set; }
        }

        public class Handler : IRequestHandler<Query, Park>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<Park> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _db.Parks.FirstOrDefaultAsync(x => x.ParkCode == request.ParkCode);
            }
        }
    }
}
