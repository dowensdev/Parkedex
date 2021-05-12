using System;

namespace Domain.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public AppUser AppUser { get; set; }
        public Park Park { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
