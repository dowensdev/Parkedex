using Application.Core;
using Application.Core.Interfaces;
using Application.ImageReferences;
using Domain;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Park Park { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Park).SetValidator(new ParkValidator());
            }
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
                _db.Parks.Add(request.Park);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Park");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
