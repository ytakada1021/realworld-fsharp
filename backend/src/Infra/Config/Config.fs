module Infra.Config

module DotEnv =
    open System
    open System.IO

    let private loadLine (line: string) =
        match line.Split('=', StringSplitOptions.RemoveEmptyEntries) with
        | args when Array.length args = 2 -> Environment.SetEnvironmentVariable(args.[0], args.[1])
        | _ -> ()

    let private load () =
        lazy
            (printfn "Trying to load .env file..."
             let dir = Directory.GetCurrentDirectory()
             let filePath = Path.Combine [| dir; ".env" |]

             filePath
             |> File.Exists
             |> function
                 | false -> printfn ".env file not found."
                 | true ->
                     printfn ".env file found. Loading variables..."
                     filePath |> File.ReadAllLines |> Seq.iter loadLine)

    let init () = load().Value
