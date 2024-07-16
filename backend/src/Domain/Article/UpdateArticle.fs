module Domain.Article.UpdateArticle

open CommonTypes

type NewAttributes =
    { Title: string
      Description: string
      Body: string }

type UpdateArticle =
    Article // input: current article
        -> NewAttributes // input: new attributes
        -> Result<Article, string> // output
