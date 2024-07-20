module Routes

open Api.AuthenticateApi
open Api.CreateArticleHandler
open Api.RegistrationApi
open Auth
open Giraffe

let routes: HttpHandler =
    subRoute
        "/api"
        (choose [
            route "/users" >=> choose [ POST >=> registrationApi ]
            route "/articles" >=> choose [ POST >=> authenticate >=> createArticleApi ]
        ])