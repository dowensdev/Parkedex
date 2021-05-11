using Application.Core;
using Application.Core.Interfaces;
using Domain;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ImageReferences
{
    public class GetImageRef
    {
        public class Query : IRequest<Result<ImageReference>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ImageReference>>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<Result<ImageReference>> Handle(Query request, CancellationToken cancellationToken)
            {
                var imageRef = await _db.ImageReferences.FindAsync(request.Id);
                return Result<ImageReference>.Success(imageRef);
            }
        }
    }
}
