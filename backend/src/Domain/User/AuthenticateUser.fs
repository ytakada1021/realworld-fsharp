module Domain.User.AuthenticateUser

open Domain.Auth.CommonTypes
open Domain.User.GenerateJwt
open Domain.CommonTypes
open FsToolkit.ErrorHandling

type Credentials = { Email: string; RawPassword: string }

type User = {
    UserId: string
    Email: string
    HashedPassword: string
    Username: string
    Bio: string option
    Image: string option
}

type FetchUserByEmail = Email -> Async<Option<User>>

type AuthenticationError =
    | InvalidEmail
    | UserNotFound
    | PasswordVerificationFailed

type Authenticate =
    FetchUserByEmail // dependency
        -> Credentials // input
        -> Async<Result<AuthenticatedUser, AuthenticationError>> // output

let toAuthenticatedUser (user: User) : AuthenticatedUser = {
    UserId = user.UserId
    Email = user.Email
    Username = user.Username
    Bio = user.Bio
    Image = user.Image
}

let authenticate: Authenticate =
    fun fetchUserByEmail credentials ->
        asyncResult {
            let! email = credentials.Email |> Email.create |> Result.mapError (fun _ -> InvalidEmail)

            let! user =
                email
                |> fetchUserByEmail
                |> Async.RunSynchronously
                |> function
                    | Some(user) -> Ok user
                    | None -> Error UserNotFound

            return!
                match Password.verify credentials.RawPassword user.HashedPassword with
                | true -> user |> toAuthenticatedUser |> Ok
                | false -> Error PasswordVerificationFailed
        }
