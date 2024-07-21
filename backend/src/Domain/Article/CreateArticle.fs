module Domain.Article.CreateArticle

open Domain.Article.CommonTypes
open Domain.Article.CommonTypes.ArticleBody
open Domain.Article.CommonTypes.ArticleTitle
open Domain.Article.CommonTypes.ArticleDescription
open Domain.Article.CommonTypes.Tag
open Domain.User.CommonTypes
open Domain.User.CommonTypes.UserId
open FsToolkit.ErrorHandling
open System

type UnvalidatedArticle = {
    Title: string
    Description: string
    Body: string
    TagList: string list
    AuthorId: string
}

type CheckAuthorExistsError = AuthorNotFound

type CheckAuthorExists = UserId -> Async<Result<UserId, CheckAuthorExistsError>>

type CreateArticleError =
    | InvalidTitle of InvalidArticleTitleError
    | InvalidDescription of InvalidArticleDescriptionError
    | InvalidBody of InvalidArticleBodyError
    | InvalidTag of InvalidTagError
    | InvalidAuthorId of InvalidUserIdError
    | AuthorNotFound

type CreateArticle =
    CheckAuthorExists // dependency
        -> UnvalidatedArticle // input
        -> Async<Result<Article, CreateArticleError>> // output

let createArticle: CreateArticle =
    fun checkAuthorExists unvalidatedArticle ->
        asyncResult {
            let slug = Slug.generate ()
            let! title = unvalidatedArticle.Title |> ArticleTitle.create
            let! description = unvalidatedArticle.Description |> ArticleDescription.create
            let! body = unvalidatedArticle.Body |> ArticleBody.create
            let! tagList =
                unvalidatedArticle.TagList
                |> List.map (fun str -> Tag.create str)
                |> List.traverseResultM (fun result -> result)
            let! authorId =
                unvalidatedArticle.AuthorId
                |> UserId.create
                |> Result.mapError (fun err -> InvalidAuthorId err)
            let! checkedAuthorId = authorId |> checkAuthorExists |> AsyncResult.mapError (fun _ -> AuthorNotFound)

            return {
                Article.Slug = slug
                Title = title
                Description = description
                Body = body
                TagList = tagList
                CreatedAt = DateTimeOffset.Now
                UpdatedAt = DateTimeOffset.Now
                AuthorId = checkedAuthorId
            }
        }
