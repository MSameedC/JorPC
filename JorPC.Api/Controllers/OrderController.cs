using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JorPC.Api.Data;
using JorPC.Api.Models;

namespace JorPC.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController(AppDbContext context) : ControllerBase
    {
        // POST /api/orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            // Basic validation
            if (string.IsNullOrWhiteSpace(request.CustomerName) || string.IsNullOrWhiteSpace(request.CustomerPhone))
            {
                return BadRequest(new { message = "Customer Name and Phone number are required." });
            }

            if (request.PartIds.Count == 0)
            {
                return BadRequest(new { message = "An order must contain at least one component." });
            }

            // Retrieve parts from database to calculate actual price server-side (preventing price tampering)
            var selectedParts = await context.Parts
                .Where(p => request.PartIds.Contains(p.Id))
                .ToListAsync();

            if (selectedParts.Count == 0)
            {
                return BadRequest(new { message = "No valid components found for the provided IDs." });
            }

            var totalPkr = selectedParts.Sum(p => p.PricePkr);

            // Generate a clean, readable Order ID (e.g. JOR-20261011-A8F2)
            var orderId = $"JOR-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..4].ToUpper()}";

            var order = new Order
            {
                Id = orderId,
                CustomerName = request.CustomerName.Trim(),
                CustomerPhone = request.CustomerPhone.Trim(),
                CustomerEmail = request.CustomerEmail?.Trim(),
                ShippingAddress = request.ShippingAddress.Trim(),
                City = request.City.Trim(),
                Notes = request.Notes?.Trim(),
                PartIds = selectedParts.Select(p => p.Id).ToList(),
                TotalPkr = totalPkr,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow
            };

            context.Orders.Add(order);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, new
            {
                orderId = order.Id,
                totalPkr = order.TotalPkr,
                status = order.Status,
                message = "Order placed successfully. We will contact you to confirm your build and shipping."
            });
        }

        // GET /api/orders/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(string id)
        {
            var order = await context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound(new { message = $"Order '{id}' not found." });
            }

            var parts = await context.Parts
                .Where(p => order.PartIds.Contains(p.Id))
                .ToListAsync();

            return Ok(new
            {
                order.Id,
                order.CustomerName,
                order.CustomerPhone,
                order.CustomerEmail,
                order.ShippingAddress,
                order.City,
                order.TotalPkr,
                order.Status,
                order.CreatedAt,
                Parts = parts
            });
        }
    }
}