using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<VisitedPark> ParksVisited { get; set; } = new List<VisitedPark>();
        public ICollection<VisitLog> VisitLogs { get; set; } = new List<VisitLog>();
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
