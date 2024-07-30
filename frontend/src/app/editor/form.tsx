"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { Tag } from "@/features/article/components/Tag";
import { FC, KeyboardEventHandler, useState } from "react";
import { createArticleAction } from "./actions";
import { useFormState } from "react-dom";
import { initialErrorState } from "./types";

export const ArticleForm: FC = () => {
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [errorState, action] = useFormState(createArticleAction, initialErrorState);

  const onTagFormKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();

        if (tag === "") {
          return;
        }

        setTagList((prev) => [...prev, tag]);
        setTag("");
      default:
        return;
    }
  };

  const onClickDeleteTag = (index: number) => {
    setTagList((prev) => {
      const newTags = [...prev];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  return (
    <>
      <ErrorMessage errors={errorState.errors} />

      <form action={action}>
        <fieldset>
          <fieldset className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Article Title" name="title" />
          </fieldset>
          <fieldset className="form-group">
            <input type="text" className="form-control" placeholder="What's this article about?" name="description" />
          </fieldset>
          <fieldset className="form-group">
            <textarea className="form-control" rows={8} placeholder="Write your article (in markdown)" name="body" />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags"
              onKeyDown={onTagFormKeyDown}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <ul className="tag-list">
              {tagList.map((tag, index) => (
                <li key={index}>
                  <input type="hidden" name="tagList" value={tag} />
                  <Tag as="span" variant="filled" onClick={() => onClickDeleteTag(index)}>
                    <i className="ion-close-round" />
                    {tag}
                  </Tag>
                </li>
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
