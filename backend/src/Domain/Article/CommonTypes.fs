module Domain.Article.CommonTypes

open Domain.User.CommonTypes
open FsToolkit.ErrorHandling
open System

type Slug = private Slug of string

type ArticleTitle = private ArticleTitle of string

type ArticleDescription = private ArticleDescription of string

type ArticleBody = private ArticleBody of string

type Tag = private Tag of string


type Article = {
    Slug: Slug
    Title: ArticleTitle
    Description: ArticleDescription
    Body: ArticleBody
    TagList: Tag list
    CreatedAt: DateTimeOffset
    UpdatedAt: DateTimeOffset
    AuthorId: UserId
}

/// Save article to persistence.
type SaveArticle = Article -> Async<Result<unit, string>>

module Slug =
    type InvalidSlugError =
        | EmptyString
        | TooLong
        | InvalidCharacter

    let create str = Ok(Slug str)

    let generate () =
        Guid.NewGuid()
        |> string
        |> create
        |> Result.either (fun v -> v) (fun _ -> failwith "Unexpected error")

    let value (Slug str) = str

module ArticleTitle =
    type InvalidArticleTitleError =
        | EmptyString
        | TooLong

    let create str = Ok(ArticleTitle str)

    let value (ArticleTitle str) = str

module ArticleDescription =
    type InvalidArticleDescriptionError =
        | EmptyString
        | TooLong

    let create str = Ok(ArticleDescription str)

    let value (ArticleDescription str) = str

module ArticleBody =
    type InvalidArticleBodyError =
        | EmptyString
        | TooLong

    let create str = Ok(ArticleBody str)

    let value (ArticleBody str) = str

module Tag =
    type InvalidTagError =
        | EmptyString
        | TooLong

    let create str = Ok(Tag str)

    let value (Tag str) = str
