using Application.Core.Interfaces;
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
        public class Query : IRequest<List<Park>> {}

        public class Handler : IRequestHandler<Query, List<Park>>
        {
            private readonly IApplicationDbContext _db;
            public Handler(IApplicationDbContext db)
            {
                _db = db;
            }

            public async Task<List<Park>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _db.Parks.ToListAsync();
            }
        }
    }
}
