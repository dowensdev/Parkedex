using Application.Core.Interfaces;
using Domain;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class Create
    {
        public class Command : IRequest
        {
            public Park Park { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _db.Parks.Add(request.Park);
                await _db.SaveChangesAsync();

                return Unit.Value;   
            }
        }
    }
}
