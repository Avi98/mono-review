import Link from "next/link";
import { Card } from "../../../components/card/card";
import { LoginForm } from "./components/login-form";

const Login = () => {
  const newLocal = "underline decoration-sky-500";
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="relative flex-col justify-center">
        <Card>
          <div className="bg-card flex flex-col justify-between gap-5">
            <div className=" flex flex-col items-center justify-center gap-2 align-middle">
              <h1 className="text-2xl font-semibold">Welcome back</h1>
              <p className="text-sm font-light">
                Enter your email to sign in to your account
              </p>
            </div>
            <LoginForm />
            <p className="">
              {`Don't have a account yet?`}
              &nbsp;
              <Link href="/signUp" className={newLocal}>
                SignUp
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
