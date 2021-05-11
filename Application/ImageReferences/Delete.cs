using Application.Core;
using Application.Core.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ImageReferences
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
                var imageRef = await _db.ImageReferences.FindAsync(request.Id);
                if (imageRef == null) return null;

                _db.ImageReferences.Remove(imageRef);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete Image Reference");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
