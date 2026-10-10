using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JorPC.Api.Data;
using JorPC.Api.Models;

namespace JorPC.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Part>>> GetAll()
    {
        return Ok(await context.Parts.ToListAsync());
    }

    [HttpGet("{category}")]
    public async Task<ActionResult<IEnumerable<Part>>> GetByCategory(CategoryKey category)
    {
        var items = await context.Parts
            .Where(p => p.Category == category)
            .ToListAsync();

        return Ok(items);
    }
}