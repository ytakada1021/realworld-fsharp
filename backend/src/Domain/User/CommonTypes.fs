module Domain.User.CommonTypes

open Domain.CommonTypes
open Domain.Auth.CommonTypes
open FsToolkit.ErrorHandling
open System

type UserId = private UserId of string

module UserId =
    open System.Text.RegularExpressions

    type InvalidUserIdError =
        | EmptyString
        | TooLong
        | InvalidCharacter

    let create str =
        let length = String.length str

        if length < 1 then
            Error EmptyString
        elif 50 < length then
            Error TooLong
        elif not (Regex.IsMatch(str, "^[0-9A-Za-z\\-]+$")) then
            Error InvalidCharacter
        else
            Ok(UserId str)

    let generate () =
        Guid.NewGuid()
        |> string
        |> create
        |> Result.either (fun v -> v) (fun _ -> failwith "Unexpected error")

    let value (UserId str) = str

type Username = AlphaNumericalString50

module Username =
    type InvalidUsernameError =
        | EmptyString
        | TooLong
        | InvalidCharacter

    let create str : Result<Username, InvalidUsernameError> =
        str
        |> AlphaNumericalString50.create
        |> Result.mapError (fun err ->
            match err with
            | AlphaNumericalString50.EmptyString -> EmptyString
            | AlphaNumericalString50.TooLong -> TooLong
            | AlphaNumericalString50.InvalidCharacter -> InvalidCharacter)

    let value (username: Username) = AlphaNumericalString50.value username

type Bio = String1000

module Bio =
    type InvalidBioError =
        | EmptyString
        | TooLong

    let create str : Result<Bio, InvalidBioError> =
        str
        |> String1000.create
        |> Result.mapError (fun err ->
            match err with
            | String1000.EmptyString -> EmptyString
            | String1000.TooLong -> TooLong)

    let value (bio: Bio) = String1000.value bio

type Image = String1000

module Image =
    type InvalidImageError =
        | EmptyString
        | TooLong

    let create str : Result<Image, InvalidImageError> =
        str
        |> String1000.create
        |> Result.mapError (fun err ->
            match err with
            | String1000.EmptyString -> EmptyString
            | String1000.TooLong -> TooLong)

    let value (image: Image) = String1000.value image

type User = {
    UserId: UserId
    Username: Username
    Email: Email
    Bio: Bio option
    Image: Image option
    HashedPassword: HashedPassword
    CreatedAt: DateTimeOffset
    UpdatedAt: DateTimeOffset
}

type SaveUser = User -> Async<unit>
