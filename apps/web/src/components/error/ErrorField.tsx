import { FieldError } from "react-hook-form";

interface IErrorSubField {
  error?: FieldError | string;
}
export const ErrorSubField = ({ error }: IErrorSubField) => {
  if (!error) return null;

  const errorMessage = () => {
    if (typeof error === "object") {
      return "message" in error && error.message;
    }
    return error;
  };
  return (
    <div className="text-destructive outline-destructive/[0.8] outline-solid bg-destructive/[0.07] m-1 my-3 rounded-md px-2 text-left outline outline-2">
      {errorMessage()}
    </div>
  );
};
