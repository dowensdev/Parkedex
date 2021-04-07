using Application.ImageReferences;
using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Parks
{
    public class ParkValidator : AbstractValidator<Park>
    {
        public ParkValidator()
        {
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.ParkCode).NotEmpty();
            RuleFor(x => x.URL).NotEmpty();
            RuleForEach(x => x.Images).SetValidator(new ImageRefValidator());
        }
    }
}
