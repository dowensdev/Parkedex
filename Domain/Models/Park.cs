using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Park
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string ParkCode { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public string States { get; set; }
        public string LatLong { get; set; }
        //Add image reference one to many list
        public ICollection<ImageReference> Images { get; set; } = new List<ImageReference>();
        //Many to many relationship to AppUsers
        public ICollection<VisitedPark> Visitors { get; set; } = new List<VisitedPark>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
