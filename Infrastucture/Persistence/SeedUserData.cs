using Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastucture.Persistence
{
    public class SeedUserData
    {
        public static async Task Seed(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                List<AppUser> users = new List<AppUser>
                {
                    new AppUser{ DisplayName = "Derek", UserName = "derek", Email = "derek@test.com" },
                    new AppUser{ DisplayName = "Bryan", UserName = "bryan", Email = "bryan@test.com" },
                    new AppUser{ DisplayName = "Emily", UserName = "emily", Email = "emily@test.com" }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}
