using Application.Core;
using Application.Core.Interfaces;
using AutoMapper;
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
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
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
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(IApplicationDbContext db, IMapper mapper, IUserAccessor userAccessor)
            {
                _db = db;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var visitLog = await _db.VisitLogs.FindAsync(request.VisitLog.Id);
                if (visitLog == null) return null;

                _mapper.Map(request.VisitLog, visitLog);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update Visit Log");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
