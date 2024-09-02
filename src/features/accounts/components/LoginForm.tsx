import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SiteLogo from "../../core/components/SiteLogo";
import Input from "../../core/components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api/queries";
import ApiError from "../../core/components/ApiError";

const schema = z
  .object({
    userId: z.string(),
    password: z.string(),
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
      <div className="border rounded border-slate-600 mt-6 px-10 pb-5">
        <SiteLogo />
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
          {"Don't have an account? "}
          <Link to="/accounts/signup" className="text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
