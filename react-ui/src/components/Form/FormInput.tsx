import { ApolloError } from "@apollo/client";
import { ComponentProps, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type Props = ComponentProps<"input"> & {
  type?: "text" | "password";
  name: string;
  error?: FieldError | undefined;
  label: string;
  required?: boolean;
  gqlError: ApolloError | undefined;
};

const FormInput = forwardRef<HTMLInputElement, Props>(({ type = "text", name, label, required = false, error, gqlError, ...props }: Props, ref) => {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className={`uppercase text-xs font-bold mb-2 ${required && !error && "after:content-['*'] after:ml-1 after:text-red"} ${
            error || gqlError ? "text-danger" : "text-h-secondary"
          }`}
        >
          {label}
          {error && <span className="italic normal-case"> - {error.message}</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        className="bg-tertiary rounded-[3px] h-10 text-secondary-light p-3 font-light focus:outline-none autofill:text-secondary-light form-input"
        type={type}
        {...props}
        ref={ref}
      />
    </>
  );
});

export default FormInput;
