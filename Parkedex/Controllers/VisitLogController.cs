using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.VisitLogs.DTOs;
using Application.VisitLogs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VisitLogController : BaseAppController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUserVisitLogs()
        {
            return HandleResult(await Mediator.Send(new GetAllUserVisitLogs.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserVisitLog(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetUserVisitLog.Query { Id = id }));
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddVisitLog(Guid id, VisitLog visitLog)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ParkId = id, VisitLog = visitLog }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVisitLog(Guid id, VisitLog visitLog)
        {
            visitLog.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Id = id, VisitLog = visitLog }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVisitLog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
