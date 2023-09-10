import { Button } from "../../../components/button/Button";
import { Card, CardBody } from "../../../components/card/card";
import { SignUpForm } from "./components/sign-up-form";

const SignUp = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardBody
          header="Create your account"
          subHeader="Enter your email to create your account"
        >
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
