module Infra.Domain.User.AuthenticateUser

open Domain.CommonTypes
open Dapper
open Domain.User.AuthenticateUser
open Npgsql

type UserDto = {
    user_id: string
    email: string
    hashed_password: string
    username: string
    bio: string option
    image: string option
}

module UserDto =
    let toDomain (dto: UserDto) : User = {
        UserId = dto.user_id
        Email = dto.email
        HashedPassword = dto.hashed_password
        Username = dto.username
        Bio = dto.bio
        Image = dto.image
    }

let fetchUserByEmail (dbConnection: NpgsqlConnection) : FetchUserByEmail =
    fun email ->
        async {
            let sql =
                """
                    SELECT
                        "user_id",
                        "email",
                        "hashed_password",
                        "username",
                        "bio",
                        "image"
                    FROM 
                        "users"
                    WHERE
                        "users"."email" = @email
                """

            return
                dbConnection.Query<UserDto>(sql, {| email = Email.value email |})
                |> Seq.tryHead
                |> Option.map UserDto.toDomain
        }
