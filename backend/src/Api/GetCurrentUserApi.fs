module Api.GetCurrentUserApi

open Api.CommonTypes
open Application.GetCurrentUserService
open Auth
open Domain.Auth.Jwt
open ErrorHandling
open Giraffe
open Infra.Query.FetchUserById
open Microsoft.AspNetCore.Http
open System

type GetCurrentUserResponse = { User: User }

module GetCurrentUserResponse =
    open Domain.User.GenerateJwt

    let fromDomain (user: UserWithToken) : GetCurrentUserResponse = {
        User = {
            Email = user.Email
            Token = user.Token
            Username = user.Username
            Bio = user.Bio
            Image = user.Image
        }
    }

let getCurrentUserApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let conn = ctx.Items["db"] :?> Npgsql.NpgsqlConnection
            let userId = ctx |> getUserIdFromContext |> Option.get

            // inject dependency
            let appKey = Environment.GetEnvironmentVariable "APP_KEY"
            let registeredClaims = {
                RegisteredClaims.Issuer = Environment.GetEnvironmentVariable "JWT_ISSUER" |> Some
                Audience = Environment.GetEnvironmentVariable "JWT_AUDIENCE" |> Some
                ExpirationMinutes = Environment.GetEnvironmentVariable "JWT_EXPIRATION_MINUTES" |> float |> Some
            }
            let fetchUserById = fetchUserById conn
            let service = getCurrentUserService appKey registeredClaims fetchUserById

            // main logic
            let! result = service userId

            return!
                match result with
                | (Ok user) ->
                    user
                    |> GetCurrentUserResponse.fromDomain
                    |> fun response -> json response next ctx
                | (Error err) ->
                    let errMessage = err |> string
                    notFoundErrorHandler [ errMessage ] next ctx
        }
