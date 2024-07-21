module Auth

open Giraffe
open Microsoft.AspNetCore.Authentication.JwtBearer
open Microsoft.AspNetCore.Http

let mustBeLoggedIn: HttpHandler =
    requiresAuthentication (challenge JwtBearerDefaults.AuthenticationScheme)

let getUserIdFromContext (ctx: HttpContext) =
    ctx.User.Claims
    |> Seq.tryFind (fun claim -> claim.Type = "user_id")
    |> Option.map (fun claim -> claim.Value)
