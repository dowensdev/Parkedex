using Domain.Models;
using FluentValidation;

namespace Application.VisitLogs
{
    public class VisitLogValidator : AbstractValidator<VisitLog>
    {
        public VisitLogValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.StartDate).NotEmpty();
            RuleFor(x => x.EndDate).NotEmpty();
        }
    }
}
