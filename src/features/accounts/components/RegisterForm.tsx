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
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
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
      <div className="border rounded border-slate-600 mt-6 px-10 pb-5">
        <SiteLogo />
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
            className="w-full mt-4 py-1 bg-blue-500 rounded-lg font-semibold"
          >
            Next
          </button>
        </form>
      </div>

      <div className="flex flex-row justify-center border rounded border-slate-600 py-4">
        <p>
          {"Have an account? "}
          <Link to="/accounts/login" className="text-blue-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
