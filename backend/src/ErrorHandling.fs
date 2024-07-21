module ErrorHandling

open Api.CommonTypes
open Giraffe
open Microsoft.Extensions.Logging
open System

let exceptionHandler (ex: Exception) (logger: ILogger) : HttpHandler =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> ServerErrors.internalError (text "Internal server error.")

let notFoundErrorHandler (errors: string list) : HttpHandler =
    let response = {
        GenericError.Errors = {| Body = errors |}
    }
    clearResponse >=> RequestErrors.notFound (json response)

let validationErrorHandler (errors: string list) : HttpHandler =
    let response = {
        GenericError.Errors = {| Body = errors |}
    }
    clearResponse >=> RequestErrors.unprocessableEntity (json response)
