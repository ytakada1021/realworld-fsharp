module Api.CreateArticleHandler

open Application.CreateArticleService
open Auth
open CommonTypes
open Domain.Article.CreateArticle
open ErrorHandling
open Giraffe
open Infra.Domain.Article.CommonTypes
open Infra.Domain.Article.CreateArticle
open Infra.Query.FetchArticleBySlug
open Microsoft.AspNetCore.Http

type CreateArticleRequest = { Article: NewArticle }

module CreateArticleRequest =
    let toDomain (request: CreateArticleRequest) userId : UnvalidatedArticle = {
        Title = request.Article.Title
        Description = request.Article.Description
        Body = request.Article.Body
        TagList = request.Article.TagList
        AuthorId = userId
    }

let createArticleApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let conn = ctx.Items["db"] :?> Npgsql.NpgsqlConnection
            let trx = conn.BeginTransaction()
            let userId = ctx |> getUserIdFromContext |> Option.get

            // inject dependencies
            let saveArticle = saveArticle conn trx
            let service = createArticleService checkAuthorExists saveArticle fetchArticleBySlug

            let! request = ctx.BindJsonAsync<CreateArticleRequest>()
            let! article = CreateArticleRequest.toDomain request userId |> service

            trx.Commit()

            return!
                match article with
                | Ok(v) -> json v next ctx
                | Error(err) ->
                    let errMessage = err |> string
                    validationErrorHandler [ errMessage ] next ctx
        }
