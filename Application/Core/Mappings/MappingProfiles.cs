using Application.Comments.DTOs;
using Application.ImageReferences.DTOs;
using Application.Parks.DTOs;
using Application.UserParks;
using AutoMapper;
using Domain;
using Domain.Models;

namespace Application.Core.Mappings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Park, ParkDto>()
                .ForMember(d => d.VisitorCount, o => o.MapFrom(s => s.Visitors.Count));
            
            CreateMap<ImageReference, ImageRefDto>();
            
            CreateMap<VisitedPark, VisitorDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
            CreateMap<VisitedPark, VisitedParkDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.ParkId))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Park.FullName));

            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));
        }
    }
}
