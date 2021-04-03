using Application.Parks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ParksController : BaseAppController
    {
        [HttpGet]
        public async Task<ActionResult<List<Park>>> GetAllParks()
        {
            return await Mediator.Send(new GetAll.Query { });
        }

        [HttpGet("{parkCode}")]
        public async Task<ActionResult<Park>> GetPark(string parkCode)
        {
            return await Mediator.Send(new GetPark.Query { ParkCode = parkCode });
        }

        [HttpPost]
        public async Task<IActionResult> CreatePark(Park park)
        {
            return Ok(await Mediator.Send(new Create.Command { Park = park }));
        }
    }
}
