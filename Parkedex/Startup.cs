using API.Extensions;
using Application.Parks;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

namespace Parkedex
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(opt =>
            {
                opt.RegisterValidatorsFromAssemblyContaining<Create>();
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithExposedHeaders("Pagination")
                        .WithOrigins("http://localhost:3000");
                });
            });

            services.AddAppServices(Configuration);
            services.AddIdentityServices(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(options => options.NoReferrer());
            app.UseXXssProtection(options => options.EnabledWithBlockMode());
            app.UseXfo(options => options.Deny());
            app.UseCsp(options => options
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com",
                    "sha256-/VVOq+Ws/EiUxf2CU6tsqsHdOWqBgHSgwBPqCTjYD3U=",
                    "sha256-NsEzkM762veirpWZeMiqlWTPdCYrm1uJHLzzwfYnDLM=",
                    "sha256-mmA4m52ZWPKWAzDvKQbF7Qhx9VHCZ2pcEdC0f9Xn/Po=",
                    "sha256-a2VR/Wq1VPr0+3GRY+lEmAQm7wjwwnDtPpcCPs2zTrw=",
                    "sha256-2WQZQFa8KGAig8CPptpS8JDqetQ2jb5arMlI6fTGWiU=",
                    "sha256-g9aHNH7iF2hhGZYtVVd5mKQSnyLPmXWw5gwiuxBVonI=",
                    "sha256-VjKqXV9i0mo5RzxvaQpz7qQA91PkjLVqLQGYNI4Cc/I="))
                .FontSources(s => s.Self().CustomSources(
                    "https://fonts.gstatic.com", "data:"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources("https://www.nps.gov", "data:"))
                .ScriptSources(s => s.Self().CustomSources("https://maps.googleapis.com", 
                    "sha256-Ur/vN+xGABZWplMg3T4Se7d+O3AzlX1aoqG+Rs4/5NQ="))
            );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Parkedex v1"));
            }
            else
            {
                //Standard way does not work well with Heroku
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ParkCommentHub>("/parkcomments");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
