using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class VisitedPark
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ParkId { get; set; }
        public Park Park { get; set; }
    }
}
