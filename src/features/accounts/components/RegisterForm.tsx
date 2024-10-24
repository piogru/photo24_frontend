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
    <div className="justyify-center flex w-full max-w-[22rem] flex-col space-y-4">
      <div className="rounded border border-slate-300 px-10 pb-5 dark:border-slate-600">
        <div className="mx-auto mb-3 mt-9 w-fit">
          <SiteLogo />
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center space-y-2">
            <span className="mb-4 block px-2 text-center text-lg">
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
            className="mt-4 w-full rounded-lg bg-blue-500 py-1 font-semibold text-white
              disabled:bg-blue-400"
          >
            Next
          </button>
        </form>
      </div>

      <div
        className="flex flex-row justify-center rounded border border-slate-300 py-4
          dark:border-slate-600"
      >
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
