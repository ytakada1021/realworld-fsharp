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

type CreateArticleResponse = { Article: Article }

module CreateArticleResponse =
    let fromQueryModel (model: Query.FetchArticleBySlug.Article) : CreateArticleResponse = {
        Article = {
            Slug = model.Slug
            Title = model.Title
            Description = model.Description
            Body = model.Body
            TagList = model.TagList
            CreatedAt = model.CreatedAt.ToIsoString()
            UpdatedAt = model.UpdatedAt.ToIsoString()
            Favorited = model.Favorited
            FavoritesCount = model.FavoritesCount
            Author = {
                Username = model.Author.Username
                Bio = model.Author.Bio
                Image = model.Author.Image
                Following = model.Author.Following
            }
        }
    }

let createArticleApi: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let conn = ctx.Items["db"] :?> Npgsql.NpgsqlConnection
            let trx = conn.BeginTransaction()
            let userId = ctx |> getUserIdFromContext |> Option.get

            // inject dependencies
            let saveArticle = saveArticle conn trx
            let fetchArticleBySlug = fetchArticleBySlug conn
            let checkAuthorExists = checkAuthorExists conn
            let service = createArticleService checkAuthorExists saveArticle fetchArticleBySlug

            let! request = ctx.BindJsonAsync<CreateArticleRequest>()
            let! result = CreateArticleRequest.toDomain request userId |> service

            trx.Commit()

            return!
                match result with
                | Ok(article) ->
                    let response = CreateArticleResponse.fromQueryModel article
                    json response next ctx
                | Error(err) ->
                    let errMessage = err |> string
                    validationErrorHandler [ errMessage ] next ctx
        }
