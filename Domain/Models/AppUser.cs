using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<VisitedPark> ParksVisited { get; set; } = new List<VisitedPark>();
        public ICollection<VisitLog> VisitLogs { get; set; } = new List<VisitLog>();
    }
}
