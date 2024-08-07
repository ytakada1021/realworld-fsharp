export type Inputs = {
  image: string;
  username: string;
  bio: string;
  email: string;
  password: string;
};

export type FormState = {
  errors: string[];
};

export const initialFormState: FormState = {
  errors: [],
};
