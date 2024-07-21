module Application.GetTagsService

open Query.FetchAllTags

type GetTagsService =
    FetchAllTags // dependency
        -> unit // input
        -> Async<Tag list> // output

let getTagsService: GetTagsService = fun fetchAllTags () -> fetchAllTags ()
