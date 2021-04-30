using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class ParkCommentHub : Hub
    {
        private readonly IMediator _mediator;

        public ParkCommentHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            //comment is a result object that returns CommentDto as value
            var comment = await _mediator.Send(command);
            await Clients.Group(command.ParkId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var parkId = httpContext.Request.Query["parkId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, parkId);
            var result = await _mediator.Send(new GetAll.Query { ParkId = Guid.Parse(parkId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}
