using Application.Core;
using Application.Core.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class Delete
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var park = await _db.Parks.FindAsync(request.Id);
                if (park == null) return null;

                _db.Parks.Remove(park);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete Park");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
