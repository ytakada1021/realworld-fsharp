module Domain.User.GenerateJwt

open Domain.Auth.Jwt
open Domain.User.AuthenticateUser

type UserWithToken = {
    UserId: string
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
            "user_id", user.UserId
            "email", user.Email
            "username", user.Username
            "bio", user.Bio |> Option.defaultValue ""
            "image", user.Image |> Option.defaultValue ""
        ]

        let token = generateJwt key registeredClaims customClaims

        {
            UserId = user.UserId
            Email = user.Email
            Token = token
            Username = user.Username
            Bio = user.Bio
            Image = user.Image
        }
