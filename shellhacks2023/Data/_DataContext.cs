using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace shellhacks2023.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Exam> Exams { get; set; } = default!;
        public DbSet<Question> Questions { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Exam>()
                .HasMany(x => x.Questions)
                .WithOne(x => x.Exam);
        }
    }
}
