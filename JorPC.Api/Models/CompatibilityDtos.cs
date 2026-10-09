namespace JorPC.Api.Models;

public class BuildValidationRequest
{
    public Part? Case { get; set; }
    public Part? Mobo { get; set; }
    public Part? Cpu { get; set; }
    public Part? Gpu { get; set; }
    public Part? Ram { get; set; }
    public Part? Ssd { get; set; }
    public Part? Cooler { get; set; }
    public Part? Psu { get; set; }
}

public class CompatibilityReport
{
    public bool IsValid => Errors.Count == 0;
    public List<string> Errors { get; } = new();
    public List<string> Warnings { get; } = new();
    public int EstimatedWattage { get; set; }
}