open ErrorHandling
open Giraffe
open Infra.Config
open Infra.Database
open Microsoft.AspNetCore.Authentication.JwtBearer
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.IdentityModel.Tokens
open Routes
open System
open System.Text
open System.Threading.Tasks

let configureApp (app: IApplicationBuilder) =
    let webApp = withDbConnection >=> routes

    app
        .UseAuthentication()
        .UseGiraffeErrorHandler(exceptionHandler)
        .UseGiraffe(webApp)

let configureServices (services: IServiceCollection) =
    let appKey = Environment.GetEnvironmentVariable "APP_KEY"
    let issuer = Environment.GetEnvironmentVariable "JWT_ISSUER"
    let audience = Environment.GetEnvironmentVariable "JWT_AUDIENCE"

    // Add Giraffe dependencies
    services
        .AddGiraffe()
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(fun (opt: JwtBearerOptions) ->
            opt.TokenValidationParameters <-
                TokenValidationParameters(
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appKey)),
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateLifetime = true,
                    ValidateAudience = true,
                    ValidAudience = audience
                )

            // Enable "Authorization: Token xxx" header format for jwt authentication
            // (By default, only "Authorization: Bearer xxx" format can be recognized by framework)
            opt.Events <-
                let event = JwtBearerEvents()
                event.OnMessageReceived <-
                    (fun ctx ->
                        if ctx.Request.Headers.ContainsKey("Authorization") then
                            let headerValue = ctx.Request.Headers.Authorization.ToArray()[0]
                            let token =
                                if headerValue.StartsWith "Token " then
                                    headerValue.Substring(6)
                                else
                                    ""
                            ctx.Token <- token
                        Task.CompletedTask)
                event)
    |> ignore

let configureLogging (builder: ILoggingBuilder) =
    // Set a logging filter (optional)
    // let filter (l: LogLevel) = l.Equals LogLevel.Error

    // Configure the logging factory
    builder
    // .AddFilter(filter) // Optional filter
    // .AddConsole() // Set up the Console logger
    // .AddDebug() // Set up the Debug logger

    // Add additional loggers if wanted...
    |> ignore

[<EntryPoint>]
let main _ =
    DotEnv.init ()
    addOptionHandlers ()

    Host
        .CreateDefaultBuilder()
        .ConfigureWebHostDefaults(fun webHostBuilder ->
            webHostBuilder
                .Configure(configureApp)
                .ConfigureServices(configureServices)
                .ConfigureLogging(configureLogging)
                .UseUrls("http://0.0.0.0:5000")
            |> ignore)
        .Build()
        .Run()

    0
