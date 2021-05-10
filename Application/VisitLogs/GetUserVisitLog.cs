using Application.Core;
using Application.Core.Interfaces;
using Application.VisitLogs.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.VisitLogs
{
    public class GetUserVisitLog
    {
        public class Query : IRequest<Result<VisitLogDto>> 
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<VisitLogDto>>
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

            public async Task<Result<VisitLogDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var visitLogs = await _db.VisitLogs.Where(x => x.AppUser.UserName == _userAccessor.GetUsername())
                    .ProjectTo<VisitLogDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<VisitLogDto>.Success(visitLogs);
            }
        }
    }
}
