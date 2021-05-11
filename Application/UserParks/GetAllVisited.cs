using Application.Core;
using Application.Core.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserParks
{
    public class GetAllVisited
    {
        public class Query : IRequest<Result<List<VisitedParkDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<VisitedParkDto>>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(IApplicationDbContext db, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _db = db;
            }

            public async Task<Result<List<VisitedParkDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var visitedParks = await _db.VisitedParks.Where(x => x.AppUser.UserName == _userAccessor.GetUsername())
                    .ProjectTo<VisitedParkDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<VisitedParkDto>>.Success(visitedParks);
            }
        }
    }
}
