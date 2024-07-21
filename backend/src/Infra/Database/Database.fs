module Infra.Database

open Dapper
open Giraffe
open Microsoft.AspNetCore.Http
open Npgsql
open System
open System.Threading.Tasks

type DateTimeOffsetHandler() =
    inherit SqlMapper.TypeHandler<DateTimeOffset>()

    override __.SetValue(param, value) = param.Value <- value

    override __.Parse value = DateTimeOffset.Parse(string value)

type OptionHandler<'T>() =
    inherit SqlMapper.TypeHandler<option<'T>>()

    override __.SetValue(param, value) =
        let valueOrNull =
            match value with
            | Some x -> box x
            | None -> null

        param.Value <- valueOrNull

    override __.Parse value =
        if isNull value || value = box DBNull.Value then
            None
        else
            Some(value :?> 'T)

let addOptionHandlers () =
    SqlMapper.AddTypeHandler(DateTimeOffsetHandler())
    SqlMapper.AddTypeHandler(OptionHandler<string>())
    SqlMapper.AddTypeHandler(OptionHandler<int>())
    SqlMapper.AddTypeHandler(OptionHandler<DateTimeOffset>())
    SqlMapper.AddTypeHandler(OptionHandler<decimal>())

let createConnection () =
    let dbHost = Environment.GetEnvironmentVariable "DB_HOST"
    let dbPort = Environment.GetEnvironmentVariable "DB_PORT" |> Int32.Parse
    let dbDatabase = Environment.GetEnvironmentVariable "DB_DATABASE"
    let dbUser = Environment.GetEnvironmentVariable "DB_USER"
    let dbPassword = Environment.GetEnvironmentVariable "DB_PASSWORD"

    let builder =
        new NpgsqlConnectionStringBuilder(
            Host = dbHost,
            Port = dbPort,
            Username = dbUser,
            Password = dbPassword,
            Database = dbDatabase,
            SslMode = SslMode.Disable
        )

    new NpgsqlConnection(builder.ToString())

let openConnection () =
    let conn = createConnection ()
    conn.Open()
    conn

type DatabaseConnection(connection: NpgsqlConnection) =
    let Connection = connection

    member _.GetConnection() = Connection

    interface IDisposable with
        member _.Dispose() = Connection.Close()

let withConnection (connection: unit -> NpgsqlConnection) (next: HttpFunc) (ctx: HttpContext) =
    task {
        use db = new DatabaseConnection(connection ())
        let conn = db.GetConnection()
        ctx.Items["db"] <- conn
        return! next ctx
    }

type Middleware = HttpFunc -> HttpContext -> Task<HttpContext option>

let withDbConnection: Middleware = openConnection |> withConnection
