module Domain.Auth.Jwt

open Microsoft.IdentityModel.Tokens
open System
open System.IdentityModel.Tokens.Jwt
open System.Security.Claims
open System.Text
open FsToolkit.ErrorHandling

// RFC7519 4.1
type RegisteredClaims = {
    Issuer: string option
    Audience: string option
    ExpirationMinutes: float option
}

type GenerateJwt =
    string // input: key string
        -> RegisteredClaims // input
        -> (string * string) list // input: custom claims
        -> string // output: jwt

let generateJwt: GenerateJwt =
    fun appKey registeredClaims customClaims ->
        let credentials =
            let securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appKey))
            new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)

        let tokenDescriptor: JwtSecurityToken =
            new JwtSecurityToken(
                registeredClaims.Issuer |> Option.defaultValue "", // iss
                registeredClaims.Audience |> Option.defaultValue "", // aud
                customClaims |> List.map (fun (k, v) -> new Claim(k, v)),
                Nullable(), // not before
                registeredClaims.ExpirationMinutes
                |> Option.map (fun minutes -> DateTime.Now.AddMinutes minutes |> Nullable)
                |> Option.defaultValue (Nullable()),
                credentials
            )

        (new JwtSecurityTokenHandler()).WriteToken(tokenDescriptor)
