using JorPC.Api.Models;

namespace JorPC.Api.Services;

public interface ICompatibilityEngine
{
    CompatibilityReport Validate(BuildValidationRequest build);
}

public class CompatibilityEngine : ICompatibilityEngine
{
    private const int BaseOverheadWatts = 80; // Motherboard, RAM, SSD, fans

    public CompatibilityReport Validate(BuildValidationRequest build)
    {
        var report = new CompatibilityReport();

        // 1. CPU & Motherboard Socket Check
        if (build.Cpu?.Specs.Socket != null && build.Mobo?.Specs.Socket != null)
        {
            if (!string.Equals(build.Cpu.Specs.Socket, build.Mobo.Specs.Socket, StringComparison.OrdinalIgnoreCase))
            {
                report.Errors.Add($"Socket Mismatch: {build.Cpu.Name} ({build.Cpu.Specs.Socket}) cannot fit {build.Mobo.Name} ({build.Mobo.Specs.Socket}).");
            }
        }

        // 2. RAM Generation Check
        if (build.Ram?.Specs.MemoryType != null && build.Mobo?.Specs.MemoryType != null)
        {
            if (!string.Equals(build.Ram.Specs.MemoryType, build.Mobo.Specs.MemoryType, StringComparison.OrdinalIgnoreCase))
            {
                report.Errors.Add($"Memory Generation Mismatch: RAM ({build.Ram.Specs.MemoryType}) does not match Motherboard ({build.Mobo.Specs.MemoryType}).");
            }
        }

        // 3. GPU Length vs Case Clearance
        if (build.Gpu?.Specs.LengthMm != null && build.Case?.Specs.MaxGpuLengthMm != null)
        {
            if (build.Gpu.Specs.LengthMm > build.Case.Specs.MaxGpuLengthMm)
            {
                report.Errors.Add($"Clearance Issue: GPU length ({build.Gpu.Specs.LengthMm}mm) exceeds Case maximum allowance ({build.Case.Specs.MaxGpuLengthMm}mm).");
            }
        }

        // 4. Power Budget Calculation
        var cpuTdp = build.Cpu?.Specs.TdpWatts ?? 0;
        var gpuTdp = build.Gpu?.Specs.TdpWatts ?? 0;
        report.EstimatedWattage = cpuTdp > 0 || gpuTdp > 0 ? cpuTdp + gpuTdp + BaseOverheadWatts : 0;

        // 5. PSU Sizing & Headroom Check
        if (build.Psu?.Specs.Wattage != null && report.EstimatedWattage > 0)
        {
            var recommendedWattage = (int)Math.Ceiling(report.EstimatedWattage * 1.25);

            if (build.Psu.Specs.Wattage < report.EstimatedWattage)
            {
                report.Errors.Add($"Insufficient Power: System requires at least {report.EstimatedWattage}W, but selected PSU delivers {build.Psu.Specs.Wattage}W.");
            }
            else if (build.Psu.Specs.Wattage < recommendedWattage)
            {
                report.Warnings.Add($"Limited Headroom: Power draw is ~{report.EstimatedWattage}W. A {recommendedWattage}W+ PSU is recommended for power spikes.");
            }
        }

        return report;
    }
}