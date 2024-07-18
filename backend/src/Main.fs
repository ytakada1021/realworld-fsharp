open ErrorHandling
open Giraffe
open Infra.Config
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Routes
open Infra.Database

let configureApp (app: IApplicationBuilder) =
    let webApp = withDbConnection >=> routes
    app.UseGiraffeErrorHandler(errorHandler).UseGiraffe webApp

let configureServices (services: IServiceCollection) =
    // Add Giraffe dependencies
    services.AddGiraffe() |> ignore

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
