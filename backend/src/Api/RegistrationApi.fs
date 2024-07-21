module Api.RegistrationApi

open Application.RegisterUserService
open CommonTypes
open Domain.Auth.Jwt
open Domain.User.CreateUser
open ErrorHandling
open Giraffe
open Infra.Domain.User.CommonTypes
open Infra.Domain.User.CreateUser
open Microsoft.AspNetCore.Http
open System

type RegistrationRequest = { User: NewUser }

module RegistrationRequest =
    let toDomain (request: RegistrationRequest) : UnvalidatedUser = {
        Email = request.User.Email
        Password = request.User.Password
        Username = request.User.Username
    }

type RegistrationResponse = { User: User }

module RegistrationResponse =
    open Domain.User.GenerateJwt

    let fromDomain (user: UserWithToken) : RegistrationResponse = {
        User = {
            Email = user.Email
            Token = user.Token
            Username = user.Username
            Bio = user.Bio
            Image = user.Image
        }
    }

let registrationApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            // get db connection
            let conn = ctx.Items["db"] :?> Npgsql.NpgsqlConnection
            let trx = conn.BeginTransaction()

            // inject dependency
            let appKey = Environment.GetEnvironmentVariable "APP_KEY"
            let registeredClaims = {
                RegisteredClaims.Issuer = Environment.GetEnvironmentVariable "JWT_ISSUER" |> Some
                Audience = Environment.GetEnvironmentVariable "JWT_AUDIENCE" |> Some
                ExpirationMinutes = Environment.GetEnvironmentVariable "JWT_EXPIRATION_MINUTES" |> float |> Some
            }
            let checkEmailExists = checkEmailExists conn trx
            let saveUser = saveUser conn trx
            let service = registerUserService appKey registeredClaims checkEmailExists saveUser

            // main logic
            let! request = ctx.BindJsonAsync<RegistrationRequest>()
            let! result = request |> RegistrationRequest.toDomain |> service

            trx.Commit()

            return!
                match result with
                | (Ok user) ->
                    user
                    |> RegistrationResponse.fromDomain
                    |> (fun response -> json response next ctx)
                | (Error err) ->
                    let errMessage = err |> string
                    validationErrorHandler [ errMessage ] next ctx
        }
