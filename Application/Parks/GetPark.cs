using Application.Core;
using Application.Core.Interfaces;
using Application.Parks.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class GetPark
    {
        public class Query : IRequest<Result<ParkDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ParkDto>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IMapper _mapper;
            public Handler(IApplicationDbContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<Result<ParkDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var park = await _db.Parks
                    .ProjectTo<ParkDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ParkDto>.Success(park);
            }
        }
    }
}
