import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SiteLogo from "../../core/components/SiteLogo";
import Input from "../../core/components/Input";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    mutation.mutate({
      userId: data.userId,
      password: data.password,
    });
  });

  return (
    <div className="justyify-center flex w-full max-w-[22rem] flex-col space-y-4">
      <div className="rounded border border-slate-300 px-10 pb-5 dark:border-slate-600">
        <div className="mx-auto mb-3 mt-9 w-fit">
          <SiteLogo />
        </div>
        <form
          onSubmit={onSubmit}
          className="mt-8 flex flex-col justify-center space-y-2"
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
            className="mt-4 w-full rounded-lg bg-blue-500 py-1 font-semibold text-white
              disabled:bg-blue-400"
          >
            Log in
          </Button>
        </form>

        <div className="mt-4 flex w-full flex-row items-center gap-4">
          <div className="inline w-full border-t border-slate-300 dark:border-slate-600" />
          <span className="text-sm font-semibold uppercase text-gray-500">
            or
          </span>
          <div className="inline w-full border-t border-slate-300 dark:border-slate-600" />
        </div>

        <div className="mt-6 w-full text-center">
          <span>Proceed as guest</span>
          <WIP />
        </div>
      </div>

      <div
        className="flex flex-row justify-center rounded border border-slate-300 py-4
          dark:border-slate-600"
      >
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
