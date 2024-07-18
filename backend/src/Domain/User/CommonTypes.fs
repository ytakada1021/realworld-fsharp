module Domain.User.CommonTypes

open FsToolkit.ErrorHandling
open System

type UserId = private UserId of string

module UserId =
    type InvalidUserIdError =
        | EmptyString
        | TooLong
        | InvalidCharacter

    let create str = Ok(UserId str)

    let generate () =
        Guid.NewGuid
        |> string
        |> create
        |> Result.either (fun v -> v) (failwith "Unexpected error")

    let value (UserId str) = str
