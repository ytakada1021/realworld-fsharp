module Infra.Query.FetchUserById

open Dapper
open Npgsql
open Query.FetchUserById

type UserDto = {
    user_id: string
    email: string
    username: string
    bio: string option
    image: string option
}

module UserDto =
    let toQueryModel (dto: UserDto) : User = {
        UserId = dto.user_id
        Email = dto.email
        Username = dto.username
        Bio = dto.bio
        Image = dto.image
    }

let fetchUserById (dbConnection: NpgsqlConnection) : FetchUserById =
    fun userId ->
        async {
            let sql =
                """
                SELECT
                    "user_id",
                    "email",
                    "username",
                    "bio",
                    "image"
                FROM
                    "users"
                WHERE
                    "user_id" = @userId
            """
            return
                dbConnection.Query<UserDto>(sql, {| userId = userId |})
                |> Seq.tryHead
                |> Option.map UserDto.toQueryModel
        }
