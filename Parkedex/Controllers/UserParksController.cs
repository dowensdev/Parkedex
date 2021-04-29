using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.UserParks;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserParksController : BaseAppController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllVisitedParks()
        {
            return HandleResult(await Mediator.Send(new GetAllVisited.Query { }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AddVisitedPark(Guid id)
        {
            return HandleResult(await Mediator.Send(new AddVisitedPark.Command { Id = id }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePark(Guid id)
        {
            return HandleResult(await Mediator.Send(new RemoveVisitedPark.Command { Id = id }));
        }

    }
}
