module Query.FetchAllTags

type Tag = string

type FetchAllTags = unit -> Async<Tag list>
