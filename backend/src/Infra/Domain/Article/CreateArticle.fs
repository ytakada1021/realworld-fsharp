module Infra.Domain.Article.CreateArticle

open Dapper
open Domain.Article.CreateArticle
open Domain.User.CommonTypes
open FsToolkit.ErrorHandling
open Npgsql

let checkAuthorExists (dbConnection: NpgsqlConnection) : CheckAuthorExists =
    fun userId ->
        asyncResult {
            let sql =
                """
                    SELECT 1
                    FROM "users"
                    WHERE "users"."user_id" = @userId
                    LIMIT 1
                """

            let queryResult =
                dbConnection.Query<int>(sql, {| userId = UserId.value userId |}) |> Seq.tryHead

            return!
                match queryResult with
                | (Some _) -> Ok userId
                | None -> Error CheckAuthorExistsError.AuthorNotFound
        }
