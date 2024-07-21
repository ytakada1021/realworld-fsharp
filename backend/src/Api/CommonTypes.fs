module Api.CommonTypes

open System

type NewUser = {
    Username: string
    Email: string
    Password: string
}

type User = {
    Email: string
    Token: string
    Username: string
    Bio: string option
    Image: string option
}

type LoginUser = { Email: string; Password: string }

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

type GenericError = { Errors: {| Body: string list |} }
