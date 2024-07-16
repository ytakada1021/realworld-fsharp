module Api.CreateArticleHandler

open Application.CreateArticleService
open CommonTypes
open Domain.Article.CreateArticle
open Giraffe
open Microsoft.AspNetCore.Http
open Infra.Domain.Article.CommonTypes
open Infra.Domain.Article.CreateArticle
open Infra.Query.FetchArticleBySlug

type CreateArticleRequest = { Article: NewArticle }

let requestToDomainModel (request: CreateArticleRequest) : UnvalidatedArticle =
    { Title = request.Article.Title
      Description = request.Article.Description
      Body = request.Article.Body
      TagList = request.Article.TagList
      AuthorId = "" }

let createArticleApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            // inject dependency
            let service = createArticleService checkAuthorExists saveArticle fetchArticleBySlug

            // deserialize request body
            let! request = ctx.BindJsonAsync<CreateArticleRequest>()

            // call main logic
            let! article = request |> requestToDomainModel |> service

            return!
                match article with
                | Ok(v) -> json v next ctx
                | Error(err) -> text "error" next ctx
        }
