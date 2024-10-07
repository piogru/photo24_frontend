import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SiteLogo from "../../core/components/SiteLogo";
import Input from "../../core/components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api/queries";
import ApiError from "../../core/components/ApiError";
import WIP from "../../core/components/WIP";
import { Button } from "@headlessui/react";

const schema = z
  .object({
    userId: z.string().max(128),
    password: z.string().max(128),
  })
  .required();

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    mutation.mutate({
      userId: data.userId,
      password: data.password,
    });
  });

  return (
    <div className="flex flex-col justyify-center max-w-[22rem] w-full space-y-4">
      <div className="border rounded px-10 pb-5 border-slate-300 dark:border-slate-600">
        <div className="w-fit mx-auto mt-9 mb-3">
          <SiteLogo />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center space-y-2 mt-8"
        >
          <Input
            name="userId"
            register={register}
            label="Username or email"
            required
          />
          <Input
            name="password"
            register={register}
            label="Password"
            type="password"
            required
          />
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
          <Button
            type="submit"
            className="w-full mt-4 py-1 bg-blue-500 disabled:bg-blue-400 rounded-lg font-semibold text-white"
          >
            Log in
          </Button>
        </form>

        <div className="mt-4 w-full flex flex-row items-center gap-4">
          <div className="inline border-t border-slate-300 dark:border-slate-600 w-full" />
          <span className="uppercase text-sm font-semibold text-gray-500">
            or
          </span>
          <div className="inline border-t border-slate-300 dark:border-slate-600 w-full" />
        </div>

        <div className="mt-6 w-full text-center">
          <span>Proceed as guest</span>
          <WIP />
        </div>
      </div>

      <div className="flex flex-row justify-center border rounded py-4 border-slate-300 dark:border-slate-600">
        <p>
          {"Don't have an account? "}
          <Link to="/accounts/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
