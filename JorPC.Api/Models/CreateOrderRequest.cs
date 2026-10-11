namespace JorPC.Api.Models;

public class CreateOrderRequest
{
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public List<string> PartIds { get; set; } = new();
}