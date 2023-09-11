import { Card, CardBody } from "../../../../components/card/card";
import { SignUpForm } from "../components/sign-up-form";

const SignUpOrg = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardBody header="Thank you for joining {{org_name}}">
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpOrg;
