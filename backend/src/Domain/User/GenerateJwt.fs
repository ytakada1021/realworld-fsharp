module Domain.User.GenerateJwt

open Domain.Auth.Jwt
open FsToolkit.ErrorHandling

type AuthenticatedUser = {
    Email: string
    Username: string
    Bio: string option
    Image: string option
}

type UserWithToken = {
    Email: string
    Token: string
    Username: string
    Bio: string option
    Image: string option
}

type CreateUserWithToken =
    string // dependency: app key
        -> RegisteredClaims // dependency
        -> AuthenticatedUser // input
        -> UserWithToken // output

let createUserWithToken: CreateUserWithToken =
    fun key registeredClaims user ->
        let customClaims = [
            "email", user.Email
            "username", user.Username
            "bio", user.Bio |> Option.defaultValue ""
            "image", user.Image |> Option.defaultValue ""
        ]

        let token =
            generateJwt key registeredClaims customClaims
            |> Result.valueOr (fun _ -> failwith "Unexpected error")

        {
            Email = user.Email
            Token = token
            Username = user.Username
            Bio = user.Bio
            Image = user.Image
        }