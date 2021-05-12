using Application.Core;
using Application.Core.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class Update
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
            private readonly IMapper _mapper;
            public Handler(IApplicationDbContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var park = await _db.Parks.FindAsync(request.Park.Id);
                if (park == null) return null;

                _mapper.Map(request.Park, park);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update Park");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
