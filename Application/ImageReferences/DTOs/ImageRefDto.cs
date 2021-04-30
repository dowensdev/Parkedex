using System;

namespace Application.ImageReferences.DTOs
{
    public class ImageRefDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Credit { get; set; }
        public string Caption { get; set; }
        public string AltText { get; set; }
        public string URL { get; set; }
        public string ParkCode { get; set; }
    }
}
