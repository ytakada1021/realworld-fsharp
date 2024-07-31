import { z } from "zod";

export const profileSchema = z.object({
  username: z.string(),
  bio: z.string(),
  image: z.string(),
  following: z.boolean(),
});

export type Profile = z.infer<typeof profileSchema>;

export const articleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: profileSchema,
});

export type Article = z.infer<typeof articleSchema>;

export const commentSchema = z.object({
  id: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  body: z.string(),
  author: profileSchema,
});

export type Comment = z.infer<typeof commentSchema>;

export const userSchema = z.object({
  email: z.string(),
  token: z.string(),
  username: z.string(),
  image: z.string(),
  bio: z.string(),
});

export type User = z.infer<typeof userSchema>;
