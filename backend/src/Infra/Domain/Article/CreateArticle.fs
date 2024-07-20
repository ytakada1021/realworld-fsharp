module Infra.Domain.Article.CreateArticle

open Domain.Article.CreateArticle
open FsToolkit.ErrorHandling

let checkAuthorExists: CheckAuthorExists =
    fun userId ->
        asyncResult {
            printf "check author exists: %A\n" userId
            return userId
        }
