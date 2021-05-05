
using Application.VisitLogs.DTOs;
using Domain;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserParks
{
    public class VisitedParkDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public int VisitLogCount { get; set; }
        public ICollection<VisitLogDto> VisitLogs { get; set; }
    }
}
