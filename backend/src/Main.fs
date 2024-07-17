open Api.CreateArticleHandler
open Giraffe
open Infra.Config
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.DependencyInjection

let webApp = choose [ route "/api/articles" >=> createArticleApi ]

let configureApp (app: IApplicationBuilder) =
    // Add Giraffe to the ASP.NET Core pipeline
    app.UseGiraffe webApp

let configureServices (services: IServiceCollection) =
    // Add Giraffe dependencies
    services.AddGiraffe() |> ignore

[<EntryPoint>]
let main _ =
    DotEnv.init ()

    Host
        .CreateDefaultBuilder()
        .ConfigureWebHostDefaults(fun webHostBuilder ->
            webHostBuilder
                .Configure(configureApp)
                .ConfigureServices(configureServices)
                .UseUrls("http://0.0.0.0:5000")
            |> ignore)
        .Build()
        .Run()

    0
