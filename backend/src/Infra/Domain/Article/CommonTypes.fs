module Infra.Domain.Article.CommonTypes

open Domain.Article.CommonTypes
open FsToolkit.ErrorHandling

let saveArticle: SaveArticle =
    fun article ->
        asyncResult {
            printf "save article: %A\n" article
            return ()
        }
