import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { AuthFormSchema } from "@/lib/utils";

// here the name is showing error type* error because
// so insted of always manually updating the name as "name:
// 'email' | 'password'" we can assign the schema for it. by
// react-hood-form FeildPath. Now no matter what changes comes in
// name or AuthFormSchema the values are automatically assigned
const formSchema = AuthFormSchema('sign-up')
interface CustomInputsProps {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
}

const CustomInputs = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputsProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                // we can add check for the type, it happens thru name feild.
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInputs;
