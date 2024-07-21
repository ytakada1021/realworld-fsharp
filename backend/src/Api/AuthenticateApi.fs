module Api.AuthenticateApi

open Application.Authenticate
open CommonTypes
open Domain.Auth.Jwt
open ErrorHandling
open Giraffe
open Infra.Domain.User.AuthenticateUser
open Microsoft.AspNetCore.Http
open System

type AuthenticateRequest = { User: LoginUser }

module AuthenticateRequest =
    open Domain.User.AuthenticateUser

    let toDomain (request: AuthenticateRequest) : Credentials = {
        Email = request.User.Email
        RawPassword = request.User.Password
    }

type AuthenticateResponse = { User: User }

module AuthenticateResponse =
    open Domain.User.GenerateJwt

    let fromDomain (domain: UserWithToken) : AuthenticateResponse = {
        User = {
            Email = domain.Email
            Token = domain.Token
            Username = domain.Username
            Bio = domain.Bio
            Image = domain.Image
        }
    }

let authenticateApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let conn = ctx.Items["db"] :?> Npgsql.NpgsqlConnection

            // inject dependency
            let appKey = Environment.GetEnvironmentVariable "APP_KEY"
            let registeredClaims = {
                RegisteredClaims.Issuer = Environment.GetEnvironmentVariable "JWT_ISSUER" |> Some
                Audience = Environment.GetEnvironmentVariable "JWT_AUDIENCE" |> Some
                ExpirationMinutes = Environment.GetEnvironmentVariable "JWT_EXPIRATION_MINUTES" |> float |> Some
            }
            let fetchUserByEmail = fetchUserByEmail conn
            let service = authenticateService appKey registeredClaims fetchUserByEmail

            // main logic
            let! request = ctx.BindJsonAsync<AuthenticateRequest>()
            let! result = request |> AuthenticateRequest.toDomain |> service

            return!
                match result with
                | (Ok user) ->
                    user
                    |> AuthenticateResponse.fromDomain
                    |> fun response -> json response next ctx
                | (Error err) ->
                    let errMessage = err |> string
                    validationErrorHandler [ errMessage ] next ctx
        }
