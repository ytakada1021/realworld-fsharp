module Domain.Article.CreateArticle

open CommonTypes
open CommonTypes.ArticleBody
open CommonTypes.ArticleTitle
open CommonTypes.ArticleDescription
open Domain.User.CommonTypes
open FsToolkit.ErrorHandling
open System

type UnvalidatedArticle = {
    Title: string
    Description: string
    Body: string
    TagList: string list
    AuthorId: string
}

type CheckAuthorExistsError = UnexpectedError of string

type CheckAuthorExists = UserId -> Async<Result<bool, string>>

type CreateArticleError =
    | InvalidTitle of InvalidArticleTitleError
    | InvalidDescription of InvalidArticleDescriptionError
    | InvalidBody of InvalidArticleBodyError
    | InvalidTag
    | InvalidAuthor
    | UnexpectedError

type CreateArticle =
    CheckAuthorExists // dependency
        -> UnvalidatedArticle // input
        -> Async<Result<Article, string>> // output

let toCheckedAuthorId (checkAuthorExists: CheckAuthorExists) (authorId: UserId) = asyncResult { return authorId } // TODO: 実装

let createArticle: CreateArticle =
    fun checkAuthorExists unvalidatedArticle ->
        asyncResult {
            let slug = Slug.generate ()
            let! title = unvalidatedArticle.Title |> ArticleTitle.create
            let! description = unvalidatedArticle.Description |> ArticleDescription.create
            let! body = unvalidatedArticle.Body |> ArticleBody.create
            let tagList = unvalidatedArticle.TagList |> List.map (fun str -> Tag.create str)
            let! authorId = unvalidatedArticle.AuthorId |> UserId.create

            return {
                Article.Slug = slug
                Title = title
                Description = description
                Body = body
                TagList = []
                CreatedAt = DateTimeOffset.Now
                UpdatedAt = DateTimeOffset.Now
                AuthorId = authorId
            }
        }
