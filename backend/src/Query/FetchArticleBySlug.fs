module Query.FetchArticleBySlug

open System

type Author = {
    Username: string
    Bio: string
    Image: string
    Following: bool
}

type Article = {
    Slug: string
    Title: string
    Description: string
    Body: string
    TagList: string list
    CreatedAt: DateTimeOffset
    UpdatedAt: DateTimeOffset
    Favorited: bool
    FavoritesCount: int64
    Author: Author
}

type FetchArticleBySlug =
    string // input: slug
        -> string // input: current (authenticated) user id
        -> Async<Option<Article>> // output
