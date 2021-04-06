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
        public async Task<IActionResult> GetAllParks()
        {
            return HandleResult(await Mediator.Send(new GetAll.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPark(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetPark.Query { Id = id }));
        }

        [HttpGet("[action]/{parkCode}")]
        public async Task<IActionResult> GetParkByParkCode(string parkCode)
        {
            return HandleResult( await Mediator.Send(new GetParkByParkCode.Query { ParkCode = parkCode }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePark(Park park)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Park = park }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePark(Guid id, Park park)
        {
            park.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Park = park }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePark(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
