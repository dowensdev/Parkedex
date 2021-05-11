using System;

namespace Domain.Models
{
    public class VisitLog
    {
        public Guid Id { get; set; }
        public string ParkName { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Notes { get; set; }
        public Guid ParkRef { get; set; }
        public AppUser AppUser { get; set; }
    }
}
