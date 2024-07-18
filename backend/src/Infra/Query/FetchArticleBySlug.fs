module Infra.Query.FetchArticleBySlug

open Query.FetchArticleBySlug
open System

let fetchArticleBySlug: FetchArticleBySlug =
    fun slug ->
        async {
            return
                Some(
                    {
                        Slug = "hogehoge"
                        Title = "title"
                        Description = "description"
                        Body = "This is body"
                        TagList = [ "Tag1"; "Tag2" ]
                        CreatedAt = DateTime.Now
                        UpdatedAt = DateTime.Now
                        Favorited = true
                        FavoritesCount = 100
                        Author = {
                            Username = "John doe"
                            Bio = "biobio"
                            Image = "https://example.com"
                            Following = false
                        }
                    }
                )
        }
