using System;
using System.Collections.Generic;

namespace JorPC.Api.Models
{
    public class Order
    {
        public string Id { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string? CustomerEmail { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public decimal TotalPkr { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Stores the list of part IDs (e.g., ["cpu-1", "gpu-1"]) as a comma-separated string or relationship
        public List<string> PartIds { get; set; } = new();
    }
}