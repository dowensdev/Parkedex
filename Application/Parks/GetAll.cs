using Application.Core;
using Application.Core.Interfaces;
using Application.Parks.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using System.Linq;
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
                        .OrderBy(fn => fn.FullName)
                        .ProjectTo<ParkDto>(_mapper.ConfigurationProvider)
                        .AsQueryable();

                if (request.Params.Search != null && request.Params.Search.Length > 0)
                {
                    query = query.Where(p => p.FullName.ToLower().Contains(request.Params.Search.ToLower()));
                }

                return Result<PagedList<ParkDto>>.Success(
                    await PagedList<ParkDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)     
                );
            }
        }
    }
}
