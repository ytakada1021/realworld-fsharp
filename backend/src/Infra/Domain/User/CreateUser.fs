module Infra.Domain.User.CreateUser

open Dapper
open Domain.CommonTypes
open Domain.User.CreateUser
open Npgsql

let checkEmailExists (dbConnection: NpgsqlConnection) (transaction: NpgsqlTransaction) : CheckEmailExists =
    fun email ->
        async {
            let sql =
                """
                SELECT 1
                FROM "users"
                WHERE "users"."email" = @email
                LIMIT 1
            """

            let! result =
                dbConnection.QueryAsync<int>(sql, {| email = Email.value email |}, transaction)
                |> Async.AwaitTask

            return
                match result.AsList().Count < 1 with
                | true -> Ok email
                | false -> Error EmailAlreadyExistsError
        }
