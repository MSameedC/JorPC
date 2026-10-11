using Microsoft.AspNetCore.Mvc;
using JorPC.Api.Models;
using JorPC.Api.Services;

namespace JorPC.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompatibilityController(ICompatibilityEngine engine) : ControllerBase
{
    [HttpPost("validate")]
    public ActionResult<CompatibilityReport> Validate([FromBody] BuildValidationRequest request)
    {
        var result = engine.Validate(request);
        return Ok(result);
    }
}