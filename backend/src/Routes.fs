module Routes

open Api.AuthenticateApi
open Api.CreateArticleHandler
open Api.GetCurrentUserApi
open Api.RegistrationApi
open Auth
open Giraffe

let routes: HttpHandler =
    subRoute
        "/api"
        (choose [
            route "/user" >=> GET >=> mustBeLoggedIn >=> getCurrentUserApi
            route "/users" >=> choose [ POST >=> registrationApi ]
            route "/users/login" >=> POST >=> authenticateApi
            route "/articles" >=> choose [ POST >=> mustBeLoggedIn >=> createArticleApi ]
        ])
