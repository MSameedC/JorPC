using Microsoft.EntityFrameworkCore;
using JorPC.Api.Models;
using System.Text.Json;

namespace JorPC.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Part> Parts => Set<Part>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Store PartSpecs as JSON in SQLite for flexible hardware specs
        modelBuilder.Entity<Part>()
            .Property(p => p.Specs)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<PartSpecs>(v, (JsonSerializerOptions?)null) ?? new PartSpecs()
            );

        // Store Category enum as string in DB
        modelBuilder.Entity<Part>()
            .Property(p => p.Category)
            .HasConversion<string>();
        
        modelBuilder.Entity<Order>()
            .Property(o => o.PartIds)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>()
            );
    }
}