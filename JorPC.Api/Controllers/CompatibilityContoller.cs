using Microsoft.AspNetCore.Mvc;
using JorPC.Api.Models;
using JorPC.Api.Services;

namespace JorPC.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompatibilityController : ControllerBase
{
    private readonly ICompatibilityEngine _engine;

    public CompatibilityController(ICompatibilityEngine engine)
    {
        _engine = engine;
    }

    [HttpPost("validate")]
    public ActionResult<CompatibilityReport> Validate([FromBody] BuildValidationRequest request)
    {
        var result = _engine.Validate(request);
        return Ok(result);
    }
}