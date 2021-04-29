using Application.Core;
using Application.Core.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            private readonly IUserAccessor _userAccessor;

            public Handler(IApplicationDbContext db, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _db = db;
            }

            public async Task<Result<List<VisitedParkDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _db.Users.Include(vp => vp.ParksVisited)
                    .ThenInclude(p => p.Park)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var visitedParkList = new List<VisitedParkDto>();
                foreach (VisitedPark visited in user.ParksVisited)
                {

                    visitedParkList.Add(new VisitedParkDto
                    {
                        Id = visited.Park.Id,
                        FullName = visited.Park.FullName
                    });
                }

                return Result<List<VisitedParkDto>>.Success(visitedParkList);
            }
        }
    }
}
