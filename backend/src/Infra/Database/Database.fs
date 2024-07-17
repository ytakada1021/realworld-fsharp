module Infra.Database

open Npgsql
open System

let createConnection () =
    let dbHost = Environment.GetEnvironmentVariable "DB_HOST"
    let dbPort = Environment.GetEnvironmentVariable "DB_PORT" |> Int32.Parse
    let dbDatabase = Environment.GetEnvironmentVariable "DB_DATABASE"
    let dbUser = Environment.GetEnvironmentVariable "DB_USER"
    let dbPassword = Environment.GetEnvironmentVariable "DB_PASSWORD"

    let builder =
        new NpgsqlConnectionStringBuilder(Host = dbHost, Port = dbPort, Username = dbUser, Password = dbPassword, Database = dbDatabase, SslMode = SslMode.Disable)

    new NpgsqlConnection(builder.ToString())
