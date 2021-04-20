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

        [HttpPut("{parkCode}")]
        public async Task<IActionResult> AddVisitedPark(string parkCode)
        {
            return HandleResult(await Mediator.Send(new AddVisitedPark.Command { ParkCode = parkCode }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePark(Guid id)
        {
            return HandleResult(await Mediator.Send(new RemoveVisitedPark.Command { Id = id }));
        }

    }
}
