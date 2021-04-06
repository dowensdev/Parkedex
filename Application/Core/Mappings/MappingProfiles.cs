using AutoMapper;
using Domain;

namespace Application.Core.Mappings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Park, Park>();
            CreateMap<ImageReference, ImageReference>();
        }
    }
}
