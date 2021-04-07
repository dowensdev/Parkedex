using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ImageReferences
{
    public class ImageRefValidator : AbstractValidator<ImageReference>
    {
        public ImageRefValidator()
        {
            RuleFor(x => x.URL).NotEmpty();
        }
    }
}
