module Application.CreateArticleService

open Domain.Article.CommonTypes
open Domain.Article.CreateArticle
open Domain.User.CommonTypes
open FsToolkit.ErrorHandling
open Query.FetchArticleBySlug

type CreateArticleServiceError = CreateArticleError

type CreateArticleService =
    CheckAuthorExists // dependency
        -> SaveArticle // dependency
        -> FetchArticleBySlug // dependency
        -> UnvalidatedArticle // input
        -> Async<Result<Article, CreateArticleServiceError>> // output

let createArticleService: CreateArticleService =
    fun checkAuthorExists saveArticle fetchArticleBySlug unvalidatedArticle ->
        asyncResult {
            let! article = unvalidatedArticle |> createArticle checkAuthorExists
            do! article |> saveArticle

            let queryModel =
                let slug = article.Slug |> Slug.value
                let userId = article.AuthorId |> UserId.value
                fetchArticleBySlug slug userId |> Async.RunSynchronously

            return
                match queryModel with
                | Some(v) -> v
                | None -> failwith "Unexpected error."
        }
