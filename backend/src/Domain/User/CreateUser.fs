module Domain.User.CreateUser

open Domain.CommonTypes
open Domain.Auth.CommonTypes
open Domain.User.CommonTypes
open FsToolkit.ErrorHandling
open System

type UnvalidatedUser = {
    Username: string
    Email: string
    Password: string
}

type CheckEmailExistsError = EmailAlreadyExistsError

type CheckEmailExists = Email -> Async<Result<Email, CheckEmailExistsError>>

type CreateUserError =
    | InvalidUsername of Username.InvalidUsernameError
    | InvalidEmail of Email.ValidationError
    | InvalidPassword of Password.InvalidPasswordError
    | EmailAlreadyExists of CheckEmailExistsError

type CreateUser =
    CheckEmailExists // dependency
        -> UnvalidatedUser // input
        -> Async<Result<User, CreateUserError>> // output

let createUser: CreateUser =
    fun checkEmailExists unvalidatedUser ->
        asyncResult {
            let userId = UserId.generate ()

            let! username =
                unvalidatedUser.Username
                |> Username.create
                |> Result.mapError (fun err -> InvalidUsername err)

            let! email =
                unvalidatedUser.Email
                |> Email.create
                |> Result.mapError (fun err -> InvalidEmail err)

            let! hashedPassword =
                unvalidatedUser.Password
                |> Password.makeHash
                |> Result.mapError (fun err -> InvalidPassword err)

            let! checkedEmail =
                email
                |> checkEmailExists
                |> AsyncResult.mapError (fun err -> CreateUserError.EmailAlreadyExists err)

            return {
                UserId = userId
                Username = username
                HashedPassword = hashedPassword
                Email = checkedEmail
                Bio = None
                Image = None
                CreatedAt = DateTimeOffset.Now
                UpdatedAt = DateTimeOffset.Now
            }
        }
