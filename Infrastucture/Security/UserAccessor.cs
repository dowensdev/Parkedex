using Application.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastucture.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAcessor;

        public UserAccessor(IHttpContextAccessor httpContextAcessor)
        {
            _httpContextAcessor = httpContextAcessor;
        }
        public string GetUsername()
        {
            return _httpContextAcessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
