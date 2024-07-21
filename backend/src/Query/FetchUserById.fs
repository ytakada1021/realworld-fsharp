module Query.FetchUserById

type User = {
    UserId: string
    Email: string
    Username: string
    Bio: string option
    Image: string option
}

type FetchUserById =
    string // input: user id
        -> Async<Option<User>> // output
