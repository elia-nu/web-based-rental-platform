using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Project4.Models;

namespace Project4.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<BookingLog> BookingLog { get; set; }
       public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> vehicles { get; set; }
        
    }
}