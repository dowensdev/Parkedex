using Application.Core;
using Application.Core.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserParks
{
    public class RemoveVisitedPark
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IUserAccessor _userAccessor;
            public Handler(IApplicationDbContext db, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _db = db;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _db.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());
                var park = await _db.Parks.FirstOrDefaultAsync(x => x.Id == request.Id);

                var visitedPark = await _db.VisitedParks.FindAsync(user.Id, park.Id);
                if (visitedPark != null)
                {
                    _db.VisitedParks.Remove(visitedPark);
                } else
                {
                    return null;
                }

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete park from list of visited parks.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
