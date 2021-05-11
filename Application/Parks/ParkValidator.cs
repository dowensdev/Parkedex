using Application.ImageReferences;
using Domain;
using FluentValidation;

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
