import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-20 md:p-40">
      <h1 className="text-3xl">Login Form</h1>
      <LoginForm />
      <Link
        to={"/register"}
        className="text-2xl border-solid border-0 border-b flex justify-between border-black w-[150px] hover:w-[170px] transition-all ease-in-out delay-150"
      >
        Or register <span>{">"}</span>
      </Link>
    </div>
  );
};

export default Login;
