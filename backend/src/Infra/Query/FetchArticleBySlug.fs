module Infra.Query.FetchArticleBySlug

open Dapper
open Npgsql
open Query.FetchArticleBySlug
open System

type ArticleDto = {
    slug: string
    title: string
    description: string
    body: string
    created_at: DateTimeOffset
    updated_at: DateTimeOffset
    favorited: bool
    favorites_count: int64
    username: string
    bio: string option
    image: string option
    following: bool
}

type TagDto = { Tag: string }

type UserDto = {
    Username: string
    Bio: string option
    Image: string option
    Following: bool
}

let dtoToQueryModel (articleDto: ArticleDto) (tagDtoList: TagDto list) : Article = {
    Article.Slug = articleDto.slug
    Title = articleDto.title
    Description = articleDto.description
    Body = articleDto.body
    TagList = tagDtoList |> List.map _.Tag
    CreatedAt = articleDto.created_at
    UpdatedAt = articleDto.updated_at
    Favorited = articleDto.favorited
    FavoritesCount = articleDto.favorites_count
    Author = {
        Author.Username = articleDto.username
        Bio = articleDto.bio |> Option.defaultValue ""
        Image = articleDto.image |> Option.defaultValue ""
        Following = articleDto.following
    }
}

let fetchArticleBySlug (dbConnection: NpgsqlConnection) : FetchArticleBySlug =
    fun slug currentUserId ->
        async {
            let fetchArticleSql =
                """
                    SELECT
                        "articles"."slug",
                        "articles"."title",
                        "articles"."description",
                        "articles"."body",
                        "articles"."created_at",
                        "articles"."updated_at",
                        CASE
                            WHEN "favorites"."slug" IS NULL THEN FALSE
                            ELSE TRUE
                        END AS "favorited",
                        COALESCE("favorites_counts"."count", 0) AS "favorites_count",
                        "users"."username",
                        "users"."bio",
                        "users"."image",
                        CASE
                            WHEN "follows"."followee_id" IS NULL THEN FALSE
                            ELSE TRUE
                        END AS "following"
                    FROM
                        "articles"
                    JOIN
                        "users"
                        ON "articles"."author_id" = "users"."user_id"
                    LEFT JOIN
                        "favorites"
                        ON "articles"."slug" = "favorites"."slug"
                            AND "favorites"."user_id" = @currentUserId
                    LEFT JOIN
                        "favorites_counts"
                        ON "articles"."slug" = "favorites_counts"."slug"
                    LEFT JOIN
                        "follows"
                        ON "articles"."author_id" = "follows"."followee_id"
                            AND "follows"."follower_id" = @currentUserId
                    WHERE
                        "articles"."slug" = @slug
                """

            let articleDto =
                dbConnection.Query<ArticleDto>(
                    fetchArticleSql,
                    {|
                        slug = slug
                        currentUserId = currentUserId
                    |}
                )
                |> Seq.tryHead

            return
                match articleDto with
                | None -> None
                | (Some dto) ->
                    let fetchTagsSql =
                        """
                            SELECT
                                "tags"."tag"
                            FROM
                                "tags"
                            WHERE
                                "tags"."slug" = @slug
                        """

                    let tagDtoList =
                        dbConnection.Query<TagDto>(fetchTagsSql, {| slug = slug |}) |> Seq.toList

                    Some(dtoToQueryModel dto tagDtoList)
        }
