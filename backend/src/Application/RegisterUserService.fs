module Application.RegisterUserService

open Domain.Auth.Jwt
open Domain.CommonTypes
open Domain.User.AuthenticateUser
open Domain.User.CommonTypes
open Domain.User.CreateUser
open Domain.User.GenerateJwt
open FsToolkit.ErrorHandling

type RegisterUserServiceError = CreateUserError

type RegisterUserService =
    string // dependency: app key
        -> RegisteredClaims // dependency
        -> CheckEmailExists // dependency
        -> SaveUser // dependency
        -> UnvalidatedUser // input
        -> Async<Result<UserWithToken, RegisterUserServiceError>> // output

let toAuthenticatedUser (user: User) = {
    AuthenticatedUser.Email = user.Email |> Email.value
    Username = user.Username |> Username.value
    Bio = user.Bio |> Option.map (fun bio -> Bio.value bio)
    Image = user.Image |> Option.map (fun image -> Image.value image)
}

let registerUserService: RegisterUserService =
    fun appKey registeredClaims checkEmailExists saveUser unvalidatedUser ->
        asyncResult {
            let! user = unvalidatedUser |> createUser checkEmailExists
            do! saveUser user

            return user |> toAuthenticatedUser |> createUserWithToken appKey registeredClaims
        }
