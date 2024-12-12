using Microsoft.AspNetCore.HttpOverrides;

namespace Spydersoft.Home.Frontend.Configuration
{
    public static class NetworkExtensions
    {
        public static void UseCustomForwardedHeaders(this IApplicationBuilder app)
        {
            var forwardedHeadersOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
            forwardedHeadersOptions.KnownNetworks.Clear();
            forwardedHeadersOptions.KnownProxies.Clear();
            app.UseForwardedHeaders(forwardedHeadersOptions);
        }
    }
}
