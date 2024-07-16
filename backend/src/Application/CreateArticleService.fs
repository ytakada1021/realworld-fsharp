module Application.CreateArticleService

open Domain.Article.CommonTypes
open Domain.Article.CreateArticle
open Domain.User.CommonTypes
open FsToolkit.ErrorHandling
open Query.FetchArticleBySlug

type CreateArticleServiceError =
    | CreateArticleError of CreateArticleError
    | UnexpectedError

type CreateArticleService =
    CheckAuthorExists // dependency
        -> SaveArticle // dependency
        -> FetchArticleBySlug // dependency
        -> UnvalidatedArticle // input
        -> Async<Result<Article, string>> // output

let createArticleService: CreateArticleService =
    fun checkAuthorExists saveArticle fetchArticleBySlug unvalidatedArticle ->
        asyncResult {
            let! article = unvalidatedArticle |> createArticle checkAuthorExists
            do! article |> saveArticle

            let queryModel =
                article.AuthorId |> UserId.value |> fetchArticleBySlug |> Async.RunSynchronously

            return
                match queryModel with
                | Some(v) -> v
                | None -> failwith "Unexpected error."
        }
