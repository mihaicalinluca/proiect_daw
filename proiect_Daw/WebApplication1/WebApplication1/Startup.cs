using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.Webpack;
using WebApplication1.Models;
using WebApplication1.Data;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using System.IO;

namespace WebApplication1
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
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
			//services.AddMvc(options => options.EnableEndpointRouting = false);

			services.AddDbContext<BlogPostsContext>(options =>
					options.UseSqlServer(Configuration.GetConnectionString("BlogPostsContext")));

			services.AddDbContext<ArticleContext>(options =>
					options.UseSqlServer(Configuration.GetConnectionString("ArticleContext")));

			services.AddCors();

			/*(options =>
		{
			options.AddPolicy("CorsPolicy",
				builder => builder.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials());
		});
			*/

			services.AddScoped(typeof(IDataRepository<>), typeof(DataRepository<>));
			services.AddScoped(typeof(IArticleDataRepository<>), typeof(ArticleDataRepository<>));
			services.AddScoped(typeof(IQuoteRepository<>), typeof(QuoteRepository<>));

			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
		    configuration.RootPath = "ClientApp/dist";
		});

		    services.AddDbContext<QuoteContext>(options =>
		            options.UseSqlServer(Configuration.GetConnectionString("QuoteContext")));

		}
		
		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseCors("CorsPolicy");
			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseRouting();
			 app.UseSpaStaticFiles();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					 "default",
					 "{controller=Home}/{action=Index}");
			});

           app.UseSpa(spa =>
		{
			// To learn more about options for serving an Angular SPA from ASP.NET Core,
			// see https://go.microsoft.com/fwlink/?linkid=864501
			//  var path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp");
			spa.Options.SourcePath = "D:/facultate/proiect_daw_frontend/ClientApp";

		    if (env.IsDevelopment())
			   {
			        spa.UseAngularCliServer(npmScript: "start");
			   }
			}); 

		}
	}
}
