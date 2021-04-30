using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Parks.DTOs
{
    public class ParkDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string ParkCode { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public string States { get; set; }
        public string LatLong { get; set; }
        public ICollection<ImageReference> Images { get; set; }
        public int VisitorCount { get; set; }
        public ICollection<VisitorDto> Visitors { get; set; }
        
    }
}
