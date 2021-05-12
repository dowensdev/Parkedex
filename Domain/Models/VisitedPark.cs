using System;

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
