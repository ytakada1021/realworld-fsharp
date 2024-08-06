"use client";

import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { Tag } from "@/modules/features/article/components/tag";
import { Article } from "@/shared/types";
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
          <Button component="button" size="lg" color="primary" variant="filled" type="submit" className="pull-xs-right">
            Publish Article
          </Button>
        </fieldset>
      </form>
    </>
  );
};
