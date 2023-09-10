import Link from "next/link";
import { Card, CardBody } from "../../../components/card/card";
import { LoginForm } from "./components/login-form";

const Login = () => {
  const newLocal = "underline decoration-sky-500";
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="relative flex-col justify-center">
        <Card>
          <CardBody
            header="Welcome back"
            subHeader="Enter your email to sign in to your account"
          >
            <LoginForm />
            <p className="pt-3">
              {`Don't have account yet?`}&nbsp;
              <Link
                href={"/sign-up"}
                className="font-semibold decoration-sky-500 hover:underline hover:underline-offset-8"
              >
                Sign Up
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
