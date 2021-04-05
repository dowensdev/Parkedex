using Application.Core.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class Update
    {
        public class Command : IRequest
        {
            public Park Park { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IApplicationDbContext _db;
            private readonly IMapper _mapper;
            public Handler(IApplicationDbContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var park = await _db.Parks.FindAsync(request.Park.Id);

                _mapper.Map(request.Park, park);

                await _db.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
