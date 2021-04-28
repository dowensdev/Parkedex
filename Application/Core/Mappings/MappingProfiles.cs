using Application.Comments.DTOs;
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
            CreateMap<Park, Park>();
            CreateMap<Park, ParkDto>();
            CreateMap<ImageReference, ImageReference>();
            CreateMap<VisitedPark, VisitorDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(vp => vp.AppUser.DisplayName));

            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));


            //CreateMap<VisitedPark, VisitedParkDto>()
        }
    }
}
