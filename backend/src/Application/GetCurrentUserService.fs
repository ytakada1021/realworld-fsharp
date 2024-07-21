module Application.GetCurrentUserService

open Domain.Auth.Jwt
open Domain.User.GenerateJwt
open FsToolkit.ErrorHandling
open Query.FetchUserById

type GetCurrentUserServiceError = | UserNotFound

type GetCurrentUserService =
    string // dependency: app key
        -> RegisteredClaims // dependency
        -> FetchUserById // dependency
        -> string // input: current authenticated user id
        -> Async<Result<UserWithToken, GetCurrentUserServiceError>> // output

let toAuthenticatedUser (user: User) : AuthenticatedUser = {
    UserId = user.UserId
    Email = user.Email
    Username = user.Username
    Bio = user.Bio
    Image = user.Image
}

let getCurrentUserService: GetCurrentUserService =
    fun appKey registeredClaims fetchUserById currentUserId ->
        asyncResult {
            let! userOption = currentUserId |> fetchUserById

            return!
                match userOption with
                | (Some user) -> user |> toAuthenticatedUser |> createUserWithToken appKey registeredClaims |> Ok
                | None -> Error UserNotFound
        }
