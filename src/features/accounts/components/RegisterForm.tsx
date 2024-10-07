import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SiteLogo from "../../core/components/SiteLogo";
import Input from "../../core/components/Input";
import { Link, useNavigate } from "react-router-dom";
import { postSignup } from "../api/queries";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../../core/components/ApiError";

const schema = z
  .object({
    name: z.string().max(128),
    email: z.string().email().max(128),
    password: z.string().max(128),
    confirmPassword: z.string().max(128),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      navigate("/");
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    mutation.mutate({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  });

  return (
    <div className="flex flex-col justyify-center max-w-[22rem] w-full space-y-4">
      <div className="border rounded px-10 pb-5 border-slate-300 dark:border-slate-600">
        <div className="w-fit mx-auto mt-9 mb-3">
          <SiteLogo />
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center space-y-2">
            <span className="block text-lg text-center mb-4 px-2">
              Sign up to see photos from your friends
            </span>
            <Input
              name="email"
              register={register}
              label="Email"
              errorObject={errors?.email}
              aria-invalid={errors.email ? "true" : "false"}
              required
            />
            <Input
              name="name"
              register={register}
              label="Username"
              errorObject={errors?.username}
              aria-invalid={errors.username ? "true" : "false"}
              required
            />
            <Input
              name="password"
              register={register}
              label="Password"
              type="password"
              errorObject={errors?.password}
              aria-invalid={errors.password ? "true" : "false"}
              required
            />
            <Input
              name="confirmPassword"
              register={register}
              label="Confirm password"
              type="password"
              errorObject={errors?.confirmPassword}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              required
            />
          </div>
          <div>
            {Object.keys(errors).length > 0 && (
              <ul className="text-red-800 dark:text-red-600">
                {Object.keys(errors).map((key) => {
                  const message = errors[key]?.message as string;
                  return <li key={key}>{message}</li>;
                })}
              </ul>
            )}
          </div>
          {mutation.isError ?
            <ApiError error={mutation.error} />
          : null}
          <button
            type="submit"
            className="w-full mt-4 py-1 bg-blue-500 disabled:bg-blue-400 rounded-lg font-semibold text-white"
          >
            Next
          </button>
        </form>
      </div>

      <div className="flex flex-row justify-center border rounded py-4 border-slate-300 dark:border-slate-600">
        <p>
          {"Have an account? "}
          <Link to="/accounts/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
