module Application.Authenticate

open Domain.Auth.Jwt
open Domain.User.AuthenticateUser
open Domain.User.GenerateJwt
open FsToolkit.ErrorHandling

type AuthenticateServiceError = | AuthenticationFailed

type AuthenticateService =
    string // dependency: app key
        -> RegisteredClaims // dependency
        -> FetchUserByEmail // dependency
        -> Credentials // input
        -> Async<Result<UserWithToken, AuthenticateServiceError>> // output

let authenticateService: AuthenticateService =
    fun appKey registeredClaims fetchUserByEmail credentials ->
        asyncResult {
            let! authenticatedUser =
                authenticate fetchUserByEmail credentials
                |> AsyncResult.mapError (fun _ -> AuthenticationFailed)

            return authenticatedUser |> createUserWithToken appKey registeredClaims
        }
