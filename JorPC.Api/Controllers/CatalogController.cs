using Microsoft.AspNetCore.Mvc;
using JorPC.Api.Models;

namespace JorPC.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogController : ControllerBase
{
    // Seed catalog with verified Karachi market items (prices in PKR)
    private static readonly List<Part> PartsCatalog = new()
    {
        // CPUs
        new Part { Id = "cpu-1", Name = "AMD Ryzen 5 7600", Category = CategoryKey.CPU, PricePkr = 56000, 
            Specs = new PartSpecs { Socket = "AM5", TdpWatts = 65 } },
        new Part { Id = "cpu-2", Name = "AMD Ryzen 7 7800X3D", Category = CategoryKey.CPU, PricePkr = 115000, 
            Specs = new PartSpecs { Socket = "AM5", TdpWatts = 120 } },
        new Part { Id = "cpu-3", Name = "Intel Core i5-13400", Category = CategoryKey.CPU, PricePkr = 61000, 
            Specs = new PartSpecs { Socket = "LGA1700", TdpWatts = 65 } },

        // Motherboards
        new Part { Id = "mb-1", Name = "MSI PRO B650M-A WiFi", Category = CategoryKey.Mobo, PricePkr = 48000, 
            Specs = new PartSpecs { Socket = "AM5", MemoryType = "DDR5", FormFactor = "Micro-ATX", MemorySlots = 4 } },
        new Part { Id = "mb-2", Name = "ASUS Prime B760M-A", Category = CategoryKey.Mobo, PricePkr = 44000, 
            Specs = new PartSpecs { Socket = "LGA1700", MemoryType = "DDR5", FormFactor = "Micro-ATX", MemorySlots = 4 } },

        // GPUs
        new Part { Id = "gpu-1", Name = "Palit GeForce RTX 4060 Dual 8GB", Category = CategoryKey.GPU, PricePkr = 98000, 
            Specs = new PartSpecs { TdpWatts = 115, LengthMm = 242 } },
        new Part { Id = "gpu-2", Name = "Zotac Gaming RTX 4070 Super Twin Edge 12GB", Category = CategoryKey.GPU, PricePkr = 195000, 
            Specs = new PartSpecs { TdpWatts = 220, LengthMm = 234 } },

        // RAM
        new Part { Id = "ram-1", Name = "Corsair Vengeance 32GB (16x2) DDR5 6000MHz", Category = CategoryKey.Ram, PricePkr = 32000, 
            Specs = new PartSpecs { MemoryType = "DDR5" } },
        new Part { Id = "ram-2", Name = "Kingston Fury Beast 16GB (8x2) DDR4 3200MHz", Category = CategoryKey.Ram, PricePkr = 14500, 
            Specs = new PartSpecs { MemoryType = "DDR4" } },

        // Storage
        new Part { Id = "ssd-1", Name = "Kingston NV2 1TB PCIe 4.0 NVMe M.2", Category = CategoryKey.SSD, PricePkr = 18500 },
        new Part { Id = "ssd-2", Name = "Samsung 980 Pro 1TB NVMe M.2", Category = CategoryKey.SSD, PricePkr = 29000 },

        // Coolers
        new Part { Id = "cl-1", Name = "Thermalright Peerless Assassin 120 SE", Category = CategoryKey.Cooler, PricePkr = 13500 },
        new Part { Id = "cl-2", Name = "DeepCool AG400 ARGB", Category = CategoryKey.Cooler, PricePkr = 7500 },

        // PSUs
        new Part { Id = "psu-1", Name = "XPG Pylon 650W 80+ Bronze", Category = CategoryKey.Psu, PricePkr = 17500, 
            Specs = new PartSpecs { Wattage = 650 } },
        new Part { Id = "psu-2", Name = "Corsair RM750e 750W 80+ Gold Fully Modular", Category = CategoryKey.Psu, PricePkr = 34000, 
            Specs = new PartSpecs { Wattage = 750 } },

        // Cases
        new Part { Id = "case-1", Name = "Thunder Armor Gaming Chassis", Category = CategoryKey.Case, PricePkr = 14500, 
            Specs = new PartSpecs { MaxGpuLengthMm = 340 } },
        new Part { Id = "case-2", Name = "Lian Li Lancool 216 RGB", Category = CategoryKey.Case, PricePkr = 31000, 
            Specs = new PartSpecs { MaxGpuLengthMm = 392 } }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Part>> GetAll() => Ok(PartsCatalog);

    [HttpGet("{category}")]
    public ActionResult<IEnumerable<Part>> GetByCategory(CategoryKey category)
    {
        var filtered = PartsCatalog.Where(p => p.Category == category).ToList();
        return Ok(filtered);
    }
}