import { useForm } from "react-hook-form";

import { authService } from "@features/auth/services/authService.ts";
import { setCredentials } from "@features/auth/store/authSlice.ts";
import { LoginPayload } from "@features/auth/types";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";
import { tokenService } from "@shared/services/tokenService.ts";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await authService.login(data);
      await tokenService.saveToken(response.token);
      dispatch(setCredentials({ token: response.token }));
    } catch (error: any) {
      setError("root", {
        message: error?.response?.data?.message ?? "Login gagal, coba lagi",
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
