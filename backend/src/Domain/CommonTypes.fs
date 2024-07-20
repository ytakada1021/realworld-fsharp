module Domain.CommonTypes

type AlphaNumericalString50 = private AlphaNumericalString50 of string

module AlphaNumericalString50 =
    open System.Text.RegularExpressions

    type ValidationError =
        | EmptyString
        | TooLong
        | InvalidCharacter

    let create str =
        let length = String.length str

        if length < 1 then
            Error EmptyString
        elif 50 < length then
            Error TooLong
        elif not (Regex.IsMatch(str, "^[0-9A-Za-z]+$")) then
            Error InvalidCharacter
        else
            Ok(AlphaNumericalString50 str)

    let value (AlphaNumericalString50 str) = str

type String200 = private String200 of string

module String200 =
    type ValidationError =
        | EmptyString
        | TooLong

    let create str =
        let length = String.length str

        if length < 1 then Error EmptyString
        elif 200 < length then Error TooLong
        else Ok(String200 str)

    let value (String200 str) = str

type String1000 = private String1000 of string

module String1000 =
    type ValidationError =
        | EmptyString
        | TooLong

    let create str =
        let length = String.length str

        if length < 1 then Error EmptyString
        elif 1000 < length then Error TooLong
        else Ok(String1000 str)

    let value (String1000 str) = str

type String20000 = private String20000 of string

module String20000 =
    type ValidationError =
        | EmptyString
        | TooLong

    let create str =
        let length = String.length str

        if length < 1 then Error EmptyString
        elif 20000 < length then Error TooLong
        else Ok(String20000 str)

    let value (String20000 str) = str

type Email = private Email of string

module Email =
    open System.Text.RegularExpressions

    type ValidationError =
        | EmptyString
        | TooLong
        | InvalidFormat

    let create str =
        let length = String.length str

        if length < 1 then
            Error EmptyString
        elif 300 < length then
            Error TooLong
        elif not (Regex.IsMatch(str, "^[^@\s]+@[^@\s]+\.[^@\s]+$")) then
            Error InvalidFormat
        else
            Ok(Email str)

    let value (Email str) = str
