module Domain.Auth.Jwt

open Microsoft.IdentityModel.Tokens
open System
open System.IdentityModel.Tokens.Jwt
open System.Security.Claims
open System.Text
open FsToolkit.ErrorHandling

// RFC7519 4.1
type RegisteredClaims = {
    Iss: string option // issuer
    Aud: string option // audience
    Exp: float option // expiration time
}

type GenerateJwtError = | ExpIsSetBeforeNbf

type GenerateJwt =
    string // input: key string
        -> RegisteredClaims // input
        -> (string * string) list // input: custom claims
        -> Result<string, GenerateJwtError> // output: jwt

let generateJwt: GenerateJwt =
    fun key registeredClaims customClaims ->
        result {
            let credentials =
                let securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)

            let tokenDescriptor: JwtSecurityToken =
                new JwtSecurityToken(
                    registeredClaims.Iss |> Option.defaultValue "", // iss
                    registeredClaims.Aud |> Option.defaultValue "", // aud
                    customClaims |> List.map (fun (k, v) -> new Claim(k, v)),
                    Nullable(), // not before
                    registeredClaims.Exp
                    |> Option.map (fun exp -> DateTime.Now.AddMinutes exp |> Nullable)
                    |> Option.defaultValue (Nullable()),
                    credentials
                )

            return (new JwtSecurityTokenHandler()).WriteToken(tokenDescriptor)
        }
