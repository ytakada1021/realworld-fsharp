type Props = {
  errors: string[];
};

export const ErrorMessage = ({ errors }: Props) => {
  return (
    errors.length > 0 && (
      <ul className="error-messages" aria-live="polite">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )
  );
};
