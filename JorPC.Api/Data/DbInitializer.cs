using JorPC.Api.Models;

namespace JorPC.Api.Data;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Parts.Any()) return; // Database already seeded

        var initialParts = new List<Part>
        {
            // CPUs
            new() { Id = "cpu-1", Name = "AMD Ryzen 5 7600", Category = CategoryKey.CPU, PricePkr = 56000, 
                Specs = new PartSpecs { Socket = "AM5", TdpWatts = 65 } },
            new() { Id = "cpu-2", Name = "AMD Ryzen 7 7800X3D", Category = CategoryKey.CPU, PricePkr = 115000, 
                Specs = new PartSpecs { Socket = "AM5", TdpWatts = 120 } },
            new() { Id = "cpu-3", Name = "Intel Core i5-13400", Category = CategoryKey.CPU, PricePkr = 61000, 
                Specs = new PartSpecs { Socket = "LGA1700", TdpWatts = 65 } },

            // Motherboards
            new() { Id = "mb-1", Name = "MSI PRO B650M-A WiFi", Category = CategoryKey.Mobo, PricePkr = 48000, 
                Specs = new PartSpecs { Socket = "AM5", MemoryType = "DDR5", FormFactor = "Micro-ATX", MemorySlots = 4 } },
            new() { Id = "mb-2", Name = "ASUS Prime B760M-A", Category = CategoryKey.Mobo, PricePkr = 44000, 
                Specs = new PartSpecs { Socket = "LGA1700", MemoryType = "DDR5", FormFactor = "Micro-ATX", MemorySlots = 4 } },

            // GPUs
            new() { Id = "gpu-1", Name = "Palit GeForce RTX 4060 Dual 8GB", Category = CategoryKey.GPU, PricePkr = 98000, 
                Specs = new PartSpecs { TdpWatts = 115, LengthMm = 242 } },
            new() { Id = "gpu-2", Name = "Zotac Gaming RTX 4070 Super 12GB", Category = CategoryKey.GPU, PricePkr = 195000, 
                Specs = new PartSpecs { TdpWatts = 220, LengthMm = 234 } },

            // RAM
            new() { Id = "ram-1", Name = "Corsair Vengeance 32GB (16x2) DDR5 6000MHz", Category = CategoryKey.Ram, PricePkr = 32000, 
                Specs = new PartSpecs { MemoryType = "DDR5" } },
            new() { Id = "ram-2", Name = "Kingston Fury Beast 16GB (8x2) DDR4 3200MHz", Category = CategoryKey.Ram, PricePkr = 14500, 
                Specs = new PartSpecs { MemoryType = "DDR4" } },

            // Storage
            new() { Id = "ssd-1", Name = "Kingston NV2 1TB PCIe 4.0 NVMe M.2", Category = CategoryKey.SSD, PricePkr = 18500 },
            new() { Id = "ssd-2", Name = "Samsung 980 Pro 1TB NVMe M.2", Category = CategoryKey.SSD, PricePkr = 29000 },

            // Coolers
            new() { Id = "cl-1", Name = "Thermalright Peerless Assassin 120 SE", Category = CategoryKey.Cooler, PricePkr = 13500 },
            new() { Id = "cl-2", Name = "DeepCool AG400 ARGB", Category = CategoryKey.Cooler, PricePkr = 7500 },

            // PSUs
            new() { Id = "psu-1", Name = "XPG Pylon 650W 80+ Bronze", Category = CategoryKey.Psu, PricePkr = 17500, 
                Specs = new PartSpecs { Wattage = 650 } },
            new() { Id = "psu-2", Name = "Corsair RM750e 750W 80+ Gold Fully Modular", Category = CategoryKey.Psu, PricePkr = 34000, 
                Specs = new PartSpecs { Wattage = 750 } },

            // Cases
            new() { Id = "case-1", Name = "Thunder Armor Gaming Chassis", Category = CategoryKey.Case, PricePkr = 14500, 
                Specs = new PartSpecs { MaxGpuLengthMm = 340 } },
            new() { Id = "case-2", Name = "Lian Li Lancool 216 RGB", Category = CategoryKey.Case, PricePkr = 31000, 
                Specs = new PartSpecs { MaxGpuLengthMm = 392 } }
        };

        context.Parts.AddRange(initialParts);
        context.SaveChanges();
    }
}