using Application.Core.Interfaces;
using Application.Parks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ParksController : BaseAppController
    {
        private readonly IMediator _mediator;

        public ParksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Park>>> GetAllParks()
        {
            return await _mediator.Send(new GetAll.Query { });
        }
    }
}
