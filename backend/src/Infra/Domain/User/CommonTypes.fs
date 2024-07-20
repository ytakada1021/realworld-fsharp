module Infra.Domain.User.CommonTypes

open Dapper
open Domain.CommonTypes
open Domain.Auth.CommonTypes
open Domain.User.CommonTypes
open Npgsql
open System

type UserDto = {
    user_id: string
    email: string
    hashed_password: string
    username: string
    bio: string option
    image: string option
    created_at: DateTimeOffset
    updated_at: DateTimeOffset
}

let domainToDto (domain: User) = {
    UserDto.user_id = domain.UserId |> UserId.value
    email = domain.Email |> Email.value
    hashed_password = domain.HashedPassword |> Password.value
    username = domain.Username |> Username.value
    bio = domain.Bio |> Option.map Bio.value
    image = domain.Image |> Option.map Image.value
    created_at = domain.CreatedAt
    updated_at = domain.UpdatedAt
}

let saveUser (dbConnection: NpgsqlConnection) (transaction: NpgsqlTransaction) : SaveUser =
    fun user ->
        async {
            let dto = user |> domainToDto

            let insertUserSql =
                """
                    INSERT INTO "users" ("user_id", "email", "hashed_password", "username", "bio", "image", "created_at", "updated_at")
                    VALUES (@user_id, @email, @hashed_password, @username, @bio, @image, @created_at, @updated_at)
                """

            dbConnection.Execute(insertUserSql, dto, transaction) |> ignore

            return ()
        }
