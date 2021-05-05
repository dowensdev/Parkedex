using Application.Core;
using Application.Core.Interfaces;
using Domain.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.VisitLogs
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ParkId { get; set; }
            public VisitLog VisitLog { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.VisitLog).SetValidator(new VisitLogValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IUserAccessor _userAccessor;
            public Handler(IApplicationDbContext db, IUserAccessor userAccessor)
            {
                _db = db;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _db.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());
                var visitedPark = await _db.VisitedParks.FindAsync(user.Id, request.ParkId);
                if (visitedPark == null) return null;

                user.VisitLogs.Add(request.VisitLog);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Visit Log");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
