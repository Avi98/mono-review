import Link from "next/link";
import { Card, CardBody } from "../../../components/card/card";
import { LoginForm } from "./components/login-form";
import { LinkButton } from "../../../components/link";

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
              <LinkButton href={"/sign-up"}>Sign Up</LinkButton>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
