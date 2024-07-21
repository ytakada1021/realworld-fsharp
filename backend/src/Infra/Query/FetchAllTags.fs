module Infra.Query.FetchAllTags

open Dapper
open Npgsql
open Query.FetchAllTags

let fetchAllTags (dbConnection: NpgsqlConnection) : FetchAllTags =
    fun () ->
        async {
            let sql =
                """
                    SELECT DISTINCT
                        "tags"."tag"
                    FROM
                        "tags"
                    ORDER BY
                        "tag"
                """

            return dbConnection.Query<Tag>(sql) |> Seq.toList
        }
