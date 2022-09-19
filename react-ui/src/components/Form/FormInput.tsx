import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  type?: "text" | "password";
  placeholder?: string;
  name: string;
  error?: FieldError | undefined;
  label: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    { type = "text", name, label, required = false, error, ...props }: Props,
    ref
  ) => {
    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className={`text-secondary uppercase text-xs font-bold mb-2 ${
              required && !error && "after:content-['*'] after:ml-1 after:text-red"
            } ${error ? 'text-danger' : 'text-secondary'}`}
          >
            {label}{error && (<span className="italic normal-case"> - {error.message}</span>)}
          </label>
        )}
        <input
          id={name}
          name={name}
          className="bg-dark rounded-sm h-10 text-secondary-light p-3 font-light focus:outline-none"
          type={type}
          {...props}
          ref={ref}
        />
      </>
    );
  }
);

export default FormInput;
