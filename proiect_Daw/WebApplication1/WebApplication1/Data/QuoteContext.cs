using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class QuoteContext : DbContext
    {
        public QuoteContext (DbContextOptions<QuoteContext> options)
            : base(options)
        {
        }

        public DbSet<WebApplication1.Models.Quote> Quotes { get; set; }
    }
}
