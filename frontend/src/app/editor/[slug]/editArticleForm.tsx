"use client";

import { ErrorMessage } from "@/components/errorMessage";
import { Tag } from "@/features/article/components/tag";
import { Article } from "@/types";
import { useFormState } from "react-dom";
import { updateArticleAction } from "./actions";
import { initialFormState } from "./types";

type Props = {
  article: Article;
};

export const EditArticleForm = ({ article }: Props) => {
  const [formState, action] = useFormState(updateArticleAction, initialFormState);

  return (
    <>
      <ErrorMessage errors={formState.errors} />
      <form action={action}>
        <input type="hidden" name="slug" value={article.slug} />
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              name="title"
              defaultValue={article.title}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              name="description"
              defaultValue={article.description}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              name="body"
              defaultValue={article.body}
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <ul className="tag-list">
              {article.tagList.map((tag, index) => (
                <Tag as="li" key={index}>
                  {tag}
                </Tag>
              ))}
            </ul>
          </fieldset>
          <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
            Publish Article
          </button>
        </fieldset>
      </form>
    </>
  );
};
