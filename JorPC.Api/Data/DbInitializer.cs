using System.Text.Json;
using System.Text.Json.Serialization;
using JorPC.Api.Models;

namespace JorPC.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "parts.json");

            if (!File.Exists(filePath))
            {
                Console.WriteLine($"[DbInitializer] Warning: parts.json not found at {filePath}");
                return;
            }

            var jsonContent = File.ReadAllText(filePath);
            
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters = { new JsonStringEnumConverter() } // Enable string enum conversion
            };

            var parts = JsonSerializer.Deserialize<List<Part>>(jsonContent, options);

            if (parts != null && parts.Count > 0)
            {
                // Clear existing records so changes in parts.json always apply
                context.Parts.RemoveRange(context.Parts);
                context.SaveChanges();

                context.Parts.AddRange(parts);
                context.SaveChanges();
                Console.WriteLine($"[DbInitializer] Successfully loaded {parts.Count} parts from parts.json.");
            }
        }
    }
}