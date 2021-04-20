using Application.Core;
using Application.Core.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
                var user = await _db.Users.Include(vp => vp.ParksVisited)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var visitedParkToRemove = user.ParksVisited.FirstOrDefault(x => x.ParkId == request.Id);
                if (visitedParkToRemove == null) return null;

                user.ParksVisited.Remove(visitedParkToRemove);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete Park");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
