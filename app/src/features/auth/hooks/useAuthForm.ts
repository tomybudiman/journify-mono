import { useForm } from "react-hook-form";

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export function useAuthForm(type: "login" | "register") {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<AuthFormValues>({
    mode: "onChange",
    defaultValues: {
      ...(type === "register" && { name: "" }),
      email: "",
      password: "",
    },
  });
  return { control, handleSubmit, isValid, isSubmitting };
}
