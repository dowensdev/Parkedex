using Application.Core;
using Application.Core.Interfaces;
using Domain;
using Domain.Models;
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
    public class AddVisitedPark
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string ParkCode { get; set; }
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

                var park = await _db.Parks.FirstOrDefaultAsync(x => x.ParkCode == request.ParkCode);

                var visitedPark = new VisitedPark
                {
                    AppUser = user,
                    Park = park
                };

                //park.Visitors.Add(visitedPark);
                user.ParksVisited.Add(visitedPark);

                var result = await _db.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to add park to list of visited parks.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
