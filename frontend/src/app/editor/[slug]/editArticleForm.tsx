"use client";

import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { useToast } from "@/modules/common/components/toast";
import { Tag } from "@/modules/features/article/components/tag";
import { Article } from "@/shared/types";
import { use, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateArticleAction } from "./actions";
import { Inputs } from "./types";

type Props = {
  article: Promise<Article>;
};

export const EditArticleForm = (props: Props) => {
  const article = use(props.article);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { addToast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const result = await updateArticleAction(inputs);
    setErrors(result.errors);
    if (result.errors.length < 1) {
      addToast({
        header: <i className="ion-checkmark-circled"></i>,
        body: "Successfully updated article!",
      });
    }
  };

  return (
    <>
      <ErrorMessage errors={errors} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("slug")} />
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              defaultValue={article.title}
              {...register("title")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              defaultValue={article.description}
              {...register("description")}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              defaultValue={article.body}
              {...register("body")}
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
            Update Article
          </Button>
        </fieldset>
      </form>
    </>
  );
};
