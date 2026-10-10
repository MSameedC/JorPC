namespace JorPC.Api.Models;

public class Order
{
    public int Id { get; set; }
    public string OrderReference { get; set; } = string.Empty; // e.g. "ORD-KHI-1001"
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string DeliveryArea { get; set; } = string.Empty;
    public bool IncludeAssembly { get; set; }
    public decimal PartsTotalPkr { get; set; }
    public decimal ServiceFeePkr { get; set; }
    public decimal TotalPkr { get; set; }
    public string SelectedPartsJson { get; set; } = string.Empty; // JSON snapshot of parts
    public string Status { get; set; } = "PendingVerification";   // PendingVerification, Verified, DepositPaid, Completed
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}