module Api.CommonTypes

open System

type Author = {
    Username: string
    Bio: string
    Image: string
    Following: bool
}

type NewArticle = {
    Title: string
    Description: string
    Body: string
    TagList: string list
}

type Article = {
    Slug: string
    Title: string
    Description: string
    Body: string
    TagList: string list
    CreatedAt: DateTime
    UpdatedAt: DateTime
    Favorited: bool
    FavoritesCount: int
    Author: Author
}
