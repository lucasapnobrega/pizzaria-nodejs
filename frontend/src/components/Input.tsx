import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<T>> | undefined;
  width?: string;
  label?: string;
  disabled?: boolean;
  labelFontSize?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  type = "text", 
  name, 
  placeholder, 
  width, 
  error, 
  label, 
  disabled = false, 
  labelFontSize, 
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-auto relative">
      <input
        type={type}
        name={name}
        id={name}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        className={`border border-lightGray rounded-md p-2 bg-dark1 text-white text-[0.95rem] ${error && "border-red-600"} placeholder:text-[0.82rem]`}
        {...props}
      />
      
      {error && typeof error.message === "string" && (
        <span className="text-red-500 font-semibold text-[0.80rem] ml-[0.1rem]">
          {(error.message === "Required" || error.message === "Expected number, received nan") ? "Preencha esse campo" : error.message}
        </span>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input