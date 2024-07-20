module Domain.Auth.CommonTypes

type HashedPassword = private HashedPassword of string

module Password =
    open BCrypt.Net
    open System.Text.RegularExpressions

    type InvalidPasswordError =
        | TooShort
        | TooLong
        | InvalidCharacter

    let makeHash rawPassword =
        let length = String.length rawPassword

        if length < 8 then
            Error TooShort
        elif 200 < length then
            Error TooLong
        elif not (Regex.IsMatch(rawPassword, "^[!-~]+$")) then
            Error InvalidCharacter
        else
            rawPassword |> BCrypt.EnhancedHashPassword |> HashedPassword |> Ok

    let verify rawPassword hashedPassword =
        BCrypt.EnhancedVerify(rawPassword, hashedPassword)

    let value (HashedPassword str) = str
