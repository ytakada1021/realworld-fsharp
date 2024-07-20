module Auth

open Giraffe
open Microsoft.AspNetCore.Authentication.JwtBearer

let mustBeLoggedIn: HttpHandler =
    requiresAuthentication (challenge JwtBearerDefaults.AuthenticationScheme)
