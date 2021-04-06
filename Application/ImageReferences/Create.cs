using Application.Core;
using Application.Core.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ImageReferences
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ImageReference ImageReference { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ImageReference).SetValidator(new ImageRefValidator());
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
                _db.ImageReferences.Add(request.ImageReference);

                var result = await _db.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Image Reference");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
