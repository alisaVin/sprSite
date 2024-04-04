using Microsoft.EntityFrameworkCore;
using SprAPI.Models;

namespace SprAPI
{
    public class SprDb : DbContext
    {
        public SprDb(DbContextOptions<SprDb> options) : base(options) 
        { }

        public DbSet<SprModel> sprModels => Set<SprModel>();
    }


}
