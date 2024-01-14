import RegisterForm from "../components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-20 md:p-40">
      <h1 className="text-3xl">Register Form</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
