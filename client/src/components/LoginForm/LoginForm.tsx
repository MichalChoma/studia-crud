import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useLogin from "../../services/Login/login";
import { ILoginData } from "../../services/Login/types";
import Notification from "../Notification/Notification";
import { EStatus } from "../Notification/types";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
const LoginForm: React.FC = () => {
  const {
    mutate,
    isError,
    error,
    isPending,
    data: loginData,
    isSuccess,
  } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginData>();

  const { setUser, login } = useAuthContext();

  const navigate = useNavigate();

  const handleLogin = async (data: ILoginData) => {
    await mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      login(loginData);
      navigate("/");
    }
  }, [isSuccess, loginData, navigate, reset, setUser, login]);

  return (
    <form
      key={loginData?.message}
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-4 p-10 rounded"
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="border rounded hover:border-darkGreen transition ease-in-out delay-150 active:border-primary focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        {errors.username && (
          <span className="text-red-500 transition ease-in-out delay-150">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="border rounded hover:border-darkGreen transition ease-in-out delay-150 focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        {errors.password && (
          <span className="text-red-500 transition ease-in-out delay-150">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isPending} secondary>
        {isPending ? "Logging in..." : "Log in"}
      </Button>

      {isError && (
        <Notification
          status={EStatus.ERROR}
          message={error.response?.data?.error ?? ""}
        />
      )}
    </form>
  );
};

export default LoginForm;
