using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Infrastructure.Scoping;

// Returns a list of survey key-ids
[ApiController]
[Route("api/forms")]
public class FormsController : ControllerBase
{
    private readonly IScopeProvider _scopeProvider;

    public FormsController(IScopeProvider scopeProvider)
    {
        _scopeProvider = scopeProvider;
    }
    
    [HttpGet]
    public IActionResult GetFormIds()
    {
        using var scope = _scopeProvider.CreateScope();
        
        var forms = scope.Database.Fetch<dynamic>(
            "SELECT [Key] FROM UFForms"
            );
            
        var keys = forms
        .Select(form => form.Key?.ToString())
        .Where(key => !string.IsNullOrWhiteSpace(key))
        .ToList();

    scope.Complete();

    return Ok(keys);
}
}

