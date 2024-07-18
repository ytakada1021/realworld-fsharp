module Routes

open Api.CreateArticleHandler
open Giraffe

let routes: HttpHandler =
    choose
        [ route "/api/articles" >=> choose [ POST >=> createArticleApi ]
          route "/time" >=> warbler (fun _ -> text (System.DateTime.Now.ToString())) ]
