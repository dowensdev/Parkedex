using Application.Core;
using Application.Core.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.VisitLogs
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
                var visitLog = await _db.VisitLogs.FindAsync(request.Id);
                if (visitLog == null) return null;

                _db.VisitLogs.Remove(visitLog);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete Visit Log");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
