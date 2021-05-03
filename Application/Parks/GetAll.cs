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
        public class Query : IRequest<Result<PagedList<ParkDto>>> 
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ParkDto>>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IMapper _mapper;
            public Handler(IApplicationDbContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<ParkDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _db.Parks
                    .ProjectTo<ParkDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<ParkDto>>.Success(
                    await PagedList<ParkDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)     
                );
            }
        }
    }
}
