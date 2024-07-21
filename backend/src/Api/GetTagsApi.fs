module Api.GetTagsApi

open Application.GetTagsService
open Giraffe
open Microsoft.AspNetCore.Http
open Npgsql
open Infra.Query.FetchAllTags

type GetTagsResponse = { Tags: string list }

let getTagsApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let conn = ctx.Items["db"] :?> NpgsqlConnection

            // inject dependency
            let fetchAllTags = fetchAllTags conn
            let service = getTagsService fetchAllTags

            // main logic
            let! tags = service ()

            let response = { GetTagsResponse.Tags = tags }
            return! json response next ctx
        }
