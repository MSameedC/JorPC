namespace JorPC.Api.Models;

public enum CategoryKey
{
    Case,
    Mobo,
    CPU,
    GPU,
    Ram,
    SSD,
    Cooler,
    Psu
}

public class PartSpecs
{
    public string? Socket { get; set; }           // e.g. "AM5", "LGA1700"
    public string? FormFactor { get; set; }       // e.g. "ATX", "Micro-ATX"
    public string? MemoryType { get; set; }       // e.g. "DDR4", "DDR5"
    public int? MemorySlots { get; set; }         // e.g. 2, 4
    public int? TdpWatts { get; set; }            // e.g. 65, 115
    public int? Wattage { get; set; }             // e.g. 650 (for PSUs)
    public int? LengthMm { get; set; }            // GPU length in mm
    public int? MaxGpuLengthMm { get; set; }      // Case max GPU clearance
    public List<string> SupportedSockets { get; set; } = new();
}

public class Part
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public CategoryKey Category { get; set; }
    public decimal PricePkr { get; set; }
    public string Warranty { get; set; } = "Official Distributor"; // or "Shop Warranty"
    public PartSpecs Specs { get; set; } = new();
}