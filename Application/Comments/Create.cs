using Application.Comments.DTOs;
using Application.Core;
using Application.Core.Interfaces;
using AutoMapper;
using Domain.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ParkId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly IApplicationDbContext _db;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(IApplicationDbContext db, IMapper mapper, IUserAccessor userAccessor)
            {
                _db = db;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var park = await _db.Parks.FindAsync(request.ParkId);
                if (park == null) return null;

                var user = await _db.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    AppUser = user,
                    Park = park,
                    Body = request.Body
                };

                park.Comments.Add(comment);

                var success = await _db.SaveChangesAsync() > 0;
                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}
