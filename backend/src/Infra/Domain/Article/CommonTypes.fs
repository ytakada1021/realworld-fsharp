module Infra.Domain.Article.CommonTypes

open Dapper
open Domain.Article.CommonTypes
open Domain.User.CommonTypes
open Npgsql
open System

type ArticleDto = {
    slug: string
    title: string
    description: string
    body: string
    author_id: string
    created_at: DateTimeOffset
    updated_at: DateTimeOffset
}

type TagDto = { slug: string; tag: string }

let domainToDto (domain: Article) : (ArticleDto * TagDto list) =
    let articleDto = {
        ArticleDto.slug = domain.Slug |> Slug.value
        title = domain.Title |> ArticleTitle.value
        description = domain.Description |> ArticleDescription.value
        body = domain.Body |> ArticleBody.value
        author_id = domain.AuthorId |> UserId.value
        created_at = domain.CreatedAt
        updated_at = domain.UpdatedAt
    }

    let tagDtoList =
        domain.TagList
        |> List.map (fun tag -> {
            TagDto.slug = domain.Slug |> Slug.value
            tag = tag |> Tag.value
        })

    articleDto, tagDtoList

let saveArticle (dbConnection: NpgsqlConnection) (transaction: NpgsqlTransaction) : SaveArticle =
    fun article ->
        async {
            let articleDto, tagDtoList = article |> domainToDto

            let insertArticleSql =
                """
                    INSERT INTO "articles" ("slug", "title", "description", "body", "author_id", "created_at", "updated_at")
                    VALUES (@slug, @title, @description, @body, @author_id, @created_at, @updated_at)
                    ON CONFLICT ("slug")
                    DO UPDATE SET "title" = @title, "description" = @description, "body" = @body, "author_id" = @author_id, "created_at" = @created_at, "updated_at" = @updated_at;
                """

            dbConnection.Execute(insertArticleSql, articleDto, transaction) |> ignore

            ///////////

            let deleteTagSql =
                """
                    DELETE FROM "tags"
                    WHERE "tags"."slug" = @slug;
                """

            dbConnection.Execute(deleteTagSql, {| slug = articleDto.slug |}, transaction)
            |> ignore

            ///////////

            let insertTagSql =
                """
                    INSERT INTO "tags" ("slug", "tag")
                    VALUES (@slug, @tag);
                """

            dbConnection.Execute(insertTagSql, tagDtoList, transaction) |> ignore

            return ()
        }
