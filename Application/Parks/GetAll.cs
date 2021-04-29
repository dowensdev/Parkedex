using Application.Core;
using Application.Core.Interfaces;
using Application.Parks.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class GetAll
    {
        public class Query : IRequest<Result<List<ParkDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ParkDto>>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IMapper _mapper;
            public Handler(IApplicationDbContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<Result<List<ParkDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var parks = await _db.Parks
                    .ProjectTo<ParkDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ParkDto>>.Success(parks);
            }
        }
    }
}
