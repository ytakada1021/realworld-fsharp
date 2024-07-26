export type FormState = {
  errors: string[];
};

export const initialFormState: FormState = {
  errors: [],
};

export type User = {
  email: string;
  username: string;
  bio: string;
  image: string;
};
