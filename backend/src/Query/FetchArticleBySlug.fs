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
    FavoritesCount: int
    Author: Author
}

type FetchArticleBySlug =
    string // input: slug
        -> Async<Option<Article>> // output
