using Application.ImageReferences;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ImageRefController : BaseAppController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllImageRefs()
        {
            return HandleResult(await Mediator.Send(new GetAll.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImageRef(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetImageRef.Query { Id = id }));
        }

        [HttpGet("[action]/{parkCode}")]
        public async Task<IActionResult> GetImageRefsByParkCode(string parkCode)
        {
            return HandleResult(await Mediator.Send(new GetImageRefsByParkCode.Query { ParkCode = parkCode }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateImageRef(ImageReference imageRef)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ImageReference = imageRef }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateImageRef(Guid id, ImageReference imageRef)
        {
            imageRef.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { ImageReference = imageRef }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImageRef(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
