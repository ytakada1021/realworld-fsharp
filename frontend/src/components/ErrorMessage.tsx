import { FC } from "react";

type ErrorMessageProps = {
  errors: string[];
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ errors }) => {
  return (
    errors.length > 0 && (
      <ul className="error-messages">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )
  );
};
