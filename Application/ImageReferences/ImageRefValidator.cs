using Domain;
using FluentValidation;

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
