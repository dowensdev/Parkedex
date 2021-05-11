
using Application.VisitLogs.DTOs;
using System;
using System.Collections.Generic;

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
