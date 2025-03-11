using Microsoft.IdentityModel.Logging;
using Spydersoft.Platform.Hosting.Options;
using Spydersoft.Platform.Hosting.StartupExtensions;
using OidcProxy.Net.OpenIdConnect;
using OidcProxy.Net.ModuleInitializers;

var builder = WebApplication.CreateBuilder(args);

//builder.AddSpydersoftTelemetry(typeof(Program).Assembly);
builder.AddSpydersoftSerilog(true);
AppHealthCheckOptions healthCheckOptions = builder.AddSpydersoftHealthChecks();

var oAuthConfig = builder.Configuration
    .GetSection("Bff")
    .Get<OidcProxyConfig>();

if (oAuthConfig != null)
{
    builder.Services.AddOidcProxy(oAuthConfig);
}
else
{
    builder.Build().Logger.LogCritical("OidcProxy configuration not found.  Exiting");
    return;
}

//var oAuthConfig = builder.Configuration
//    .GetSection("Bff")
//    .Get<Auth0ProxyConfig>();

//if (oAuthConfig != null)
//{
//    builder.Services.AddAuth0Proxy(oAuthConfig);
//}
//else
//{
//    builder.Build().Logger.LogCritical("OidcProxy configuration not found.  Exiting");
//    return;
//}

builder.Services.AddHealthChecks();
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("RequireAuthenticatedUserPolicy", policy =>
    {
        policy.RequireAuthenticatedUser();
    });

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseSwagger();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
    IdentityModelEventSource.ShowPII = true;
    IdentityModelEventSource.LogCompleteSecurityArtifact = true;
}

app.UseSpydersoftHealthChecks(healthCheckOptions)
    .UseAuthentication()
    .UseAuthorization()
    .UseCors(MyAllowSpecificOrigins);

app.UseRouting();
app.UseOidcProxy();

app.MapControllers();
app.MapReverseProxy();
app.MapFallbackToFile("/index.html");

await app.RunAsync();
