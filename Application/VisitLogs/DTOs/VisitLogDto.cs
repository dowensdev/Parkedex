using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.VisitLogs.DTOs
{
    public class VisitLogDto
    {
        public Guid Id { get; set; }
        public string ParkName { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Notes { get; set; }
        public Guid ParkRef { get; set; }
    }
}
