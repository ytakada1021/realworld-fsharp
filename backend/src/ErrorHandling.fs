module ErrorHandling

open Giraffe
open Microsoft.Extensions.Logging
open System

let errorHandler (ex: Exception) (logger: ILogger) =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> ServerErrors.INTERNAL_ERROR "Internal server error."
